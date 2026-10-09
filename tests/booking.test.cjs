const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const ts = require("typescript");
const source = ts.transpileModule(fs.readFileSync("lib/booking.ts", "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const compiled = new Module("booking-tests");
compiled._compile(source, "booking.js");
const {
  timeValue,
  isAvailableSelection,
  easternInstant,
  sessionTimeRange,
  createCalendarEvent,
} = compiled.exports;

test("a time or date outside the current coach availability cannot be submitted", () => {
  const dates = [new Date(2026, 9, 12)];
  const slots = ["9:00 AM", "10:00 AM", "11:00 AM"];
  assert.equal(
    isAvailableSelection("2026-10-12", "13:00", dates, slots),
    false,
  );
  assert.equal(
    isAvailableSelection("2026-10-13", "09:00", dates, slots),
    false,
  );
  assert.equal(isAvailableSelection("2026-10-12", "10:00", dates, slots), true);
});
test("noon, midnight, and afternoon display values convert correctly", () => {
  assert.equal(timeValue("12:00 PM"), "12:00");
  assert.equal(timeValue("12:30 AM"), "00:30");
  assert.equal(timeValue("4:15 PM"), "16:15");
});
test("Eastern sessions use the actual daylight saving offset", () => {
  assert.equal(
    easternInstant("2026-01-12", "11:00").toISOString(),
    "2026-01-12T16:00:00.000Z",
  );
  assert.equal(
    easternInstant("2026-10-12", "11:00").toISOString(),
    "2026-10-12T15:00:00.000Z",
  );
  assert.equal(
    easternInstant("2026-11-02", "11:00").toISOString(),
    "2026-11-02T16:00:00.000Z",
  );
  assert.equal(
    sessionTimeRange("2026-10-12", "11:30"),
    "11:30 AM - 12:15 PM EDT",
  );
});
test("calendar export has a stable UID, accurate 45-minute duration, escaped copy, and folded UTF-8 lines", () => {
  const event = createCalendarEvent(
    {
      id: "same-booking",
      date: "2026-10-12",
      time: "11:30",
      category: "College Admissions",
      topic: "Applications, essays;\n" + "é".repeat(80),
      phone: "(000) 000-0000",
      teams: true,
    },
    new Date("2026-10-09T15:00:00Z"),
  );
  assert.match(event, /UID:same-booking@coaching-prototype/);
  assert.match(event, /DTSTART:20261012T153000Z/);
  assert.match(event, /DTEND:20261012T161500Z/);
  assert.match(event.replace(/\r\n /g, ""), /Applications\\, essays\\;\\n/);
  assert.ok(event.split("\r\n").every((line) => Buffer.byteLength(line) <= 75));
  assert.ok(!event.includes("meeting_MOCK"));
});
