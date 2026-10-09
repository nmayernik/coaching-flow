"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  getCoachAvailableDates,
  getCoachAvailableTimesForDate,
} from "@/lib/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localDateString, parseLocalDate, timeValue } from "@/lib/booking";
import { cn } from "@/lib/utils";

interface DateTimeSelectorProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  category?: string;
  selectedCoachId?: string | null;
  hideSectionLabel?: boolean;
}

export function DateTimeSelector({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  selectedCoachId = null,
  hideSectionLabel = false,
}: DateTimeSelectorProps) {
  const availableDates = React.useMemo(
    () => getCoachAvailableDates(selectedCoachId),
    [selectedCoachId],
  );
  const firstDate = availableDates[0] ?? new Date();
  const [currentMonth, setCurrentMonth] = React.useState(
    () =>
      new Date(
        (selectedDate ? parseLocalDate(selectedDate) : firstDate).getFullYear(),
        (selectedDate ? parseLocalDate(selectedDate) : firstDate).getMonth(),
      ),
  );
  const selected = selectedDate ? parseLocalDate(selectedDate) : null;
  const times = selected
    ? getCoachAvailableTimesForDate(selectedCoachId, selected)
    : [];

  React.useEffect(() => {
    if (!availableDates.some((day) => localDateString(day) === selectedDate)) {
      const nextDate = availableDates[0];
      onDateChange(nextDate ? localDateString(nextDate) : "");
      onTimeChange("");
      if (nextDate)
        setCurrentMonth(new Date(nextDate.getFullYear(), nextDate.getMonth()));
    } else if (
      selectedTime &&
      !getCoachAvailableTimesForDate(
        selectedCoachId,
        parseLocalDate(selectedDate),
      ).some((slot) => timeValue(slot) === selectedTime)
    ) {
      onTimeChange("");
    }
  }, [
    availableDates,
    selectedCoachId,
    selectedDate,
    selectedTime,
    onDateChange,
    onTimeChange,
  ]);

  const first = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  );
  const count =
    Math.ceil(
      (first.getDay() +
        new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()) /
        7,
    ) * 7;
  const days = Array.from(
    { length: count },
    (_, index) =>
      new Date(
        first.getFullYear(),
        first.getMonth(),
        index - first.getDay() + 1,
      ),
  );
  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const months = Array.from(
    new Map(
      availableDates.map((day) => [
        `${day.getFullYear()}-${day.getMonth()}`,
        new Date(day.getFullYear(), day.getMonth()),
      ]),
    ).values(),
  );
  const monthIndex = months.findIndex(
    (month) => month.getTime() === currentMonth.getTime(),
  );

  return (
    <div>
      {!hideSectionLabel && (
        <p className="mb-3 text-base font-medium leading-7 text-gray-800">
          Choose a date and time <span className="text-red-500">*</span>
        </p>
      )}
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div
          className="w-full max-w-[316px] shrink-0 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm"
          aria-label="Appointment calendar"
        >
          <div className="mb-2 flex h-10 items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              disabled={monthIndex <= 0}
              onClick={() => setCurrentMonth(months[monthIndex - 1])}
              className="flex size-10 items-center justify-center rounded-lg text-blue-700 hover:bg-blue-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:text-gray-300"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="inline-flex h-10 items-center gap-2 rounded-lg px-2 text-sm font-medium text-blue-700 hover:bg-blue-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label={`Choose month, currently ${monthLabel}`}
              >
                {monthLabel}
                <ChevronDown className="size-4" aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-[220px]">
                {months.map((month) => (
                  <DropdownMenuItem
                    key={month.toISOString()}
                    onSelect={() => setCurrentMonth(month)}
                    className="justify-between gap-2"
                  >
                    {month.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                    {month.getTime() === currentMonth.getTime() && (
                      <Check className="size-4" aria-hidden />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              type="button"
              aria-label="Next month"
              disabled={monthIndex >= months.length - 1}
              onClick={() => setCurrentMonth(months[monthIndex + 1])}
              className="flex size-10 items-center justify-center rounded-lg text-blue-700 hover:bg-blue-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:text-gray-300"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
          <div className="grid grid-cols-7 place-items-center gap-x-0.5 gap-y-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <span
                key={index}
                className="mb-1 flex h-6 items-center text-sm text-gray-600"
                aria-hidden
              >
                {day}
              </span>
            ))}
            {days.map((day) => {
              const value = localDateString(day);
              const current = day.getMonth() === currentMonth.getMonth();
              const available =
                current &&
                availableDates.some((date) => localDateString(date) === value);
              return (
                <button
                  type="button"
                  key={value}
                  disabled={!available}
                  aria-label={day.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                  aria-pressed={value === selectedDate}
                  onClick={() => {
                    onDateChange(value);
                    onTimeChange("");
                  }}
                  className={cn(
                    "flex size-10 max-w-full items-center justify-center rounded-full text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                    !current
                      ? "invisible"
                      : available
                        ? "text-gray-800 hover:bg-blue-50"
                        : "text-gray-400",
                    value === selectedDate &&
                      "bg-blue-700 text-white hover:bg-blue-800",
                  )}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-3 text-base font-medium leading-6 text-gray-800">
            {selected
              ? `Available times on ${selected.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
              : "Select a date to view available times"}
          </p>
          <div
            className="grid grid-cols-2 gap-4 md:grid-cols-1 md:gap-2.5 lg:grid-cols-2 lg:gap-4"
            role="group"
            aria-label="Available times"
          >
            {times.map((slot) => (
              <button
                type="button"
                key={slot}
                aria-pressed={timeValue(slot) === selectedTime}
                onClick={() => onTimeChange(timeValue(slot))}
                className={cn(
                  "h-14 rounded-xl border bg-white p-4 text-base font-semibold text-gray-800 shadow-sm hover:bg-blue-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  timeValue(slot) === selectedTime
                    ? "border-blue-700 ring-1 ring-blue-700"
                    : "border-gray-400",
                )}
              >
                {slot}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm italic leading-5 text-gray-700">
            Showing in Eastern Time
          </p>
        </div>
      </div>
    </div>
  );
}
