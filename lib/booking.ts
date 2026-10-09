/** Shared booking rules used by selection, submission, confirmation, and calendar export. */
export const BOOKING_POLICY =
  "Booking your session will reserve this time for your appointment. You can reschedule up to one business day in advance.";
export const CANCELLATION_POLICY =
  'Please note that "no-shows" and cancellations made less than one business day in advance are considered sessions held.';

export function localDateString(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

export function parseLocalDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function timeValue(display: string): string {
  const match = display.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return display;
  const hour =
    (Number(match[1]) % 12) + (match[3].toUpperCase() === "PM" ? 12 : 0);
  return `${String(hour).padStart(2, "0")}:${match[2]}`;
}

export function isAvailableSelection(
  date: string,
  time: string,
  dates: Date[],
  times: string[],
): boolean {
  return (
    dates.some((day) => localDateString(day) === date) &&
    times.some((slot) => timeValue(slot) === time)
  );
}

/** Convert an Eastern wall-clock appointment to an instant, including daylight saving time. */
export function easternInstant(date: string, time: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const wallClock = Date.UTC(year, month - 1, day, hour, minute);
  let instant = wallClock;
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  for (let iteration = 0; iteration < 2; iteration++) {
    const parts = Object.fromEntries(
      formatter
        .formatToParts(new Date(instant))
        .map((part) => [part.type, part.value]),
    );
    const represented = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second),
    );
    instant += wallClock - represented;
  }
  return new Date(instant);
}

export function sessionTimeRange(date: string, time: string): string {
  const start = easternInstant(date, time);
  const end = new Date(start.getTime() + 45 * 60_000);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
  });
  const zone =
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      timeZoneName: "short",
    })
      .formatToParts(start)
      .find((part) => part.type === "timeZoneName")?.value ?? "ET";
  return `${formatter.format(start)} - ${formatter.format(end)} ${zone}`;
}

interface CalendarSession {
  id: string;
  date: string;
  time: string;
  category: string;
  topic: string;
  phone: string;
  teams: boolean;
}

export function createCalendarEvent(
  session: CalendarSession,
  now = new Date(),
): string {
  const stamp = (value: Date) =>
    value
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const escape = (value: string) =>
    value
      .replace(/\\/g, "\\\\")
      .replace(/\r?\n/g, "\\n")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,");
  const start = easternInstant(session.date, session.time);
  const description = session.teams
    ? `${session.topic}. Video session. Find the meeting link in your appointment details. Backup phone: ${session.phone}.`
    : `${session.topic}. Your coach will call ${session.phone}.`;
  // Fold at 75 UTF-8 octets as required by iCalendar.
  const fold = (line: string) => {
    const lines: string[] = [];
    let current = "";
    let bytes = 0;
    for (const char of line) {
      const length = new TextEncoder().encode(char).length;
      if (bytes + length > 75) {
        lines.push(current);
        current = " ";
        bytes = 1;
      }
      current += char;
      bytes += length;
    }
    lines.push(current);
    return lines.join("\r\n");
  };
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Bright Horizons//Coaching Prototype//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${escape(session.id)}@coaching-prototype`,
    `DTSTAMP:${stamp(now)}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(new Date(start.getTime() + 45 * 60_000))}`,
    `SUMMARY:${escape(session.category)} Appointment`,
    `DESCRIPTION:${escape(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ]
    .map(fold)
    .join("\r\n");
}

export function downloadCalendarEvent(session: CalendarSession): void {
  const url = URL.createObjectURL(
    new Blob([createCalendarEvent(session)], {
      type: "text/calendar;charset=utf-8",
    }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "coaching-session.ics";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
