"use client";

import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import { formatDateForDisplay, formatShortDateForBadge } from "./utils";
import { categoryIcons } from "./categoryIcons";
import { CoachRoleLabels, getCoachRoleLabels } from "@/lib/coachRoleLabels";
import {
  CANCELLATION_POLICY,
  downloadCalendarEvent,
  sessionTimeRange,
} from "@/lib/booking";
import { Student } from "./types";

function CategorySymbol({
  category,
  success = false,
}: {
  category: string;
  success?: boolean;
}) {
  const data = categoryIcons[category];
  if (!data) return null;
  const Icon = data.icon;
  return (
    <div
      className={`flex ${success ? "size-12" : "size-8 md:size-10"} shrink-0 items-center justify-center rounded-full ${data.bgColor}`}
    >
      {category === "College Admissions" ? (
        success ? (
          <img src="/handoff-assets/book-success.svg" alt="" />
        ) : (
          <>
            <img
              src="/handoff-assets/book-mobile.svg"
              alt=""
              className="md:hidden"
            />
            <img
              src="/handoff-assets/book.svg"
              alt=""
              className="hidden md:block"
            />
          </>
        )
      ) : (
        <Icon
          className={`${success ? "size-6" : "size-5"} ${data.iconColor}`}
          strokeWidth={1.5}
          aria-hidden
        />
      )}
    </div>
  );
}

interface Step1SummaryProps {
  selectedStudent: Student | null;
  category: string;
  onEdit: () => void;
  focusTarget?: "myself" | "dependent" | null;
}

export function Step1Summary({
  selectedStudent,
  category,
  onEdit,
  focusTarget,
}: Step1SummaryProps) {
  const forLine =
    focusTarget === "myself"
      ? "For yourself"
      : selectedStudent
        ? `For ${selectedStudent.name}`
        : "";
  return (
    <div className="mb-3 rounded-xl border border-gray-100 bg-white p-4 md:mb-6 md:rounded-2xl md:px-8 md:py-6">
      <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-start gap-3 md:gap-4">
          <CategorySymbol category={category} />
          <div className="space-y-0.5">
            <p className="text-base font-medium leading-6 text-gray-800">
              {category} Appointment
            </p>
            <p className="text-sm leading-5 text-gray-700">{forLine}</p>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={onEdit}
          className="ml-11 h-8 md:ml-0"
        >
          Edit
        </Button>
      </div>
    </div>
  );
}

interface Step2SummaryProps {
  topic: string;
  note: string;
  onEdit: () => void;
  isIntroToCollegeCoach?: boolean;
}

export function Step2Summary({
  topic,
  note,
  onEdit,
  isIntroToCollegeCoach = false,
}: Step2SummaryProps) {
  return (
    <div className="mb-3 rounded-xl border border-gray-100 bg-white p-4 md:mb-6 md:rounded-2xl md:px-8 md:py-6">
      <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 md:size-10">
            <img
              src="/handoff-assets/focus-mobile.svg"
              alt=""
              className="md:hidden"
            />
            <img
              src="/handoff-assets/focus.svg"
              alt=""
              className="hidden md:block"
            />
          </div>
          <div className="min-w-0 space-y-1">
            <p className="text-base font-medium leading-6 text-gray-800">
              {isIntroToCollegeCoach ? "Notes" : `${topic} Focus`}
            </p>
            {!isIntroToCollegeCoach && (
              <p className="text-base leading-6 text-gray-700">45 minutes</p>
            )}
            <p className="text-sm leading-[21px] text-gray-700">
              {note || "No notes added"}
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={onEdit}
          className="ml-12 h-8 shrink-0 md:ml-0"
        >
          Edit
        </Button>
      </div>
    </div>
  );
}

export interface SuccessScreenProps {
  selectedStudent: Student | null;
  category: string;
  topic: string;
  date: string;
  time: string;
  phone: string;
  bookingId: string;
  onScheduleAnother: () => void;
  onViewCalendar: () => void;
  teamsCallsMode?: boolean;
  coachContinuityEnabled?: boolean;
  meetingWithPreviousCoach?: boolean;
  previousCoachName?: string;
  coachRoleLabels?: CoachRoleLabels;
  focusTarget?: "myself" | "dependent" | null;
  isRescheduled?: boolean;
}

type DetailsProps = Pick<
  SuccessScreenProps,
  | "selectedStudent"
  | "category"
  | "topic"
  | "date"
  | "time"
  | "phone"
  | "bookingId"
  | "teamsCallsMode"
  | "focusTarget"
  | "onViewCalendar"
>;

export function AppointmentDetails({
  selectedStudent,
  category,
  topic,
  date,
  time,
  phone,
  bookingId,
  teamsCallsMode = false,
  focusTarget,
  onViewCalendar,
}: DetailsProps) {
  const shortDate = formatShortDateForBadge(date);
  return (
    <div className="grid grid-cols-1 gap-6 text-left lg:grid-cols-2">
      <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 lg:p-6">
        <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-100 text-blue-700">
          <span className="text-xs leading-4">{shortDate.month}</span>
          <span className="text-base font-medium leading-6">
            {shortDate.day}
          </span>
        </div>
        <div className="min-w-0 space-y-1 text-base leading-6 text-gray-700">
          <p className="font-medium text-gray-800">
            {formatDateForDisplay(date)}
          </p>
          <p>{sessionTimeRange(date, time)}</p>
          {teamsCallsMode ? (
            <>
              <p className="pt-1 text-sm leading-[21px]">
                A meeting link for this session will be emailed and available in{" "}
                <button
                  type="button"
                  onClick={onViewCalendar}
                  className="rounded text-blue-700 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  My Calendar
                </button>
                .
              </p>
              <p className="pt-1 text-sm leading-[21px]">
                If we run into issues connecting, we&apos;ll call you at {phone}
                .
              </p>
            </>
          ) : (
            <p>We&apos;ll call you at {phone}</p>
          )}
          <button
            type="button"
            onClick={() =>
              downloadCalendarEvent({
                id: bookingId,
                date,
                time,
                category,
                topic,
                phone,
                teams: teamsCallsMode,
              })
            }
            className="inline-flex items-center gap-2 rounded pt-2 text-base font-semibold text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <CalendarPlus className="size-4" strokeWidth={1.5} aria-hidden />
            Add to calendar
          </button>
        </div>
      </div>
      <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 lg:p-6">
        <CategorySymbol category={category} success />
        <div className="min-w-0 space-y-1 text-base leading-6 text-gray-700">
          <p className="font-medium text-gray-800">{category} Appointment</p>
          {category !== "Intro to College Coach" && <p>{topic}</p>}
          <p>
            {focusTarget === "myself"
              ? "For yourself"
              : selectedStudent
                ? `For ${selectedStudent.name}`
                : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export function RescheduleNotice() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-blue-300 bg-blue-25 px-3 py-2 text-left">
      <img src="/handoff-assets/alert.svg" alt="" className="mt-0.5 shrink-0" />
      <div className="space-y-1 text-base leading-6 text-gray-700">
        <p className="font-semibold text-gray-800">Need to reschedule?</p>
        <p>{CANCELLATION_POLICY}</p>
      </div>
    </div>
  );
}

export function SuccessScreen(props: SuccessScreenProps) {
  const {
    onScheduleAnother,
    onViewCalendar,
    coachContinuityEnabled,
    meetingWithPreviousCoach,
    previousCoachName,
    coachRoleLabels = getCoachRoleLabels(),
    isRescheduled,
  } = props;
  return (
    <section
      className="space-y-8 rounded-xl border border-gray-100 bg-white p-4 md:rounded-2xl md:p-8"
      aria-label="Appointment confirmation"
    >
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-success-100">
          <img src="/handoff-assets/check-circle.svg" alt="" />
        </div>
        <h2 className="text-2xl font-semibold leading-8 text-gray-800">
          {isRescheduled
            ? "Your session is rescheduled!"
            : "Your session is booked!"}
        </h2>
        <p className="mt-2 text-base font-medium leading-6 text-gray-700">
          Here are the details:
        </p>
      </div>
      <AppointmentDetails {...props} />
      {coachContinuityEnabled && meetingWithPreviousCoach && (
        <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-4 text-left lg:p-6">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100">
            <img src="/handoff-assets/rebook.svg" alt="" />
          </div>
          <div className="space-y-1">
            <p className="text-base leading-6 text-gray-800">
              Rebooked with your {coachRoleLabels.previous}
              {previousCoachName ? `, ${previousCoachName}` : ""}
            </p>
            <p className="text-sm leading-[21px] text-gray-700">
              In the rare case your preferred {coachRoleLabels.singular} is
              unavailable, we&apos;ll do our best to assign another for that
              time. You will be able to rebook with{" "}
              {previousCoachName ?? `your ${coachRoleLabels.singular}`} for
              future sessions.
            </p>
          </div>
        </div>
      )}
      <RescheduleNotice />
      <div className="flex flex-col gap-3 md:flex-row">
        <Button
          variant="secondary"
          size="2xl"
          onClick={onScheduleAnother}
          className="flex-1"
        >
          Schedule another
        </Button>
        <Button size="2xl" onClick={onViewCalendar} className="flex-1">
          Manage appointments
        </Button>
      </div>
    </section>
  );
}
