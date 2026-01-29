"use client"

import * as React from "react";
import { Button } from "bhds-react/button";
import { Calendar, CircleCheck, Copy } from "lucide-react";
import { AlertCircle, Dotpoints01 } from "@bh-enterpriseux/bhds-icons";
import { Badge } from "@/components/ui/badge";
import { formatDateForDisplay, formatShortDateForBadge, convertValueTimeToDisplay } from "./utils";
import { categoryIcons } from "./categoryIcons";

const MOCK_TEAMS_LINK = "https://teams.microsoft.com/l/meetup-join/19%3ameeting_MOCK1234%40thread.v2/0?context=%7b%22Tid%22%3a%22mock_tenant_id%22%2c%22Oid%22%3a%22mock_user_id%22%7d";

interface Student {
  id: number;
  name: string;
  age: string;
}

interface Step1SummaryProps {
  selectedStudent: Student | null;
  category: string;
  onEdit: () => void;
}

export function Step1Summary({ selectedStudent, category, onEdit }: Step1SummaryProps) {
  const iconData = categoryIcons[category];

  return (
    <div className="border border-gray-100 rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-3 lg:mb-4 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 lg:space-x-4">
          {iconData && (
            <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${iconData.bgColor} flex-shrink-0`}>
              {(() => {
                const IconComponent = iconData.icon;
                return (
                  <IconComponent 
                    className={`w-4 h-4 lg:w-5 lg:h-5 ${iconData.iconColor}`}
                    strokeWidth={1.5}
                  />
                );
              })()}
            </div>
          )}
          <div className="space-y-1">
            <p className="font-medium text-sm lg:text-base text-gray-800">{category} appointment</p>
            <p className="text-gray-700 text-xs lg:text-sm">For {selectedStudent?.name} ({selectedStudent?.age}) · 45 minutes</p>
          </div>
        </div>
        <Button
          variant="Secondary"
          size="sm"
          onClick={onEdit}
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

export function Step2Summary({ topic, note, onEdit, isIntroToCollegeCoach = false }: Step2SummaryProps) {
  return (
    <div className="border border-gray-100 rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-3 lg:mb-4 bg-white shadow-sm align-bottom">
      <div className="flex justify-center gap-4 items-center">
        <div className="flex items-start gap-3 lg:gap-4 min-w-0 flex-1">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <Dotpoints01 className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" aria-hidden />
          </div>
          <div className="min-w-0 space-y-1">
            {isIntroToCollegeCoach ? (
              <>
                <p className="font-medium text-base text-[var(--bhds-colors-gray-800)]">Notes</p>
                <p className="text-gray-700 text-sm lg:text-base">
                  {note ? note : "No notes added"}
                </p>
              </>
            ) : (
              <>
                <p className="font-medium text-base text-[var(--bhds-colors-gray-800)]">{topic} Focus</p>
                <p className="text-[var(--bhds-colors-gray-800)] text-base font-medium">45 minutes</p>
                <p className="text-gray-700 text-sm lg:text-base mt-2 leading-relaxed">
                  {note ? note : "No notes added"}
                </p>
              </>
            )}
          </div>
        </div>
        <Button variant="Secondary" size="sm" onClick={onEdit} className="flex-shrink-0">
          Edit
        </Button>
      </div>
    </div>
  );
}

interface SuccessScreenProps {
  selectedStudent: Student | null;
  category: string;
  topic: string;
  date: string;
  time: string;
  phone: string;
  onScheduleAnother: () => void;
  onViewCalendar: () => void;
  /** When true, shows vertical stacked layout with Teams meeting link and backup phone copy */
  teamsCallsMode?: boolean;
  /** When true, shows "Meeting with previous coach" badge below "For [name]" in appointment card */
  coachContinuityEnabled?: boolean;
  /** When true (and coachContinuityEnabled), user chose to meet with previous coach */
  meetingWithPreviousCoach?: boolean;
}

export function SuccessScreen({ 
  selectedStudent, 
  category, 
  topic, 
  date, 
  time, 
  phone, 
  onScheduleAnother, 
  onViewCalendar,
  teamsCallsMode = false,
  coachContinuityEnabled = false,
  meetingWithPreviousCoach = false
}: SuccessScreenProps) {
  const showPreviousCoachBadge = coachContinuityEnabled && meetingWithPreviousCoach;
  const iconData = categoryIcons[category];
  const shortDate = formatShortDateForBadge(date);
  const appointmentTypeLabel = `${category} Appointment`;
  const startTimeDisplay = convertValueTimeToDisplay(time);
  const endTimeDisplay = startTimeDisplay.replace(/(\d+):00/, "$1:45");
  const [copiedLink, setCopiedLink] = React.useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(MOCK_TEAMS_LINK);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 text-center transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in">
      {/* Success Icon */}
      <div className="flex justify-center mb-4 lg:mb-6 ">
        <div className="w-14 h-14 bg-success-100 flex justify-center items-center rounded-full">
          <CircleCheck className="w-7 h-7 text-success-600" strokeWidth={1.5} aria-hidden />
        </div>
      </div>

      <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-2">
        Your session is booked!
      </h2>
      <p className="text-gray-600 text-sm lg:text-base mb-6 lg:mb-8">
        Here are the details:
      </p>

      {teamsCallsMode ? (
        /* Teams mode: vertical stacked cards */
        <div className="space-y-4 lg:space-y-5 mb-6 lg:mb-8 text-left">
          {/* Card 1: Meeting details with Teams link */}
          <div className="border border-[var(--bhds-colors-gray-200)] rounded-xl p-4 lg:p-5 flex gap-4 bg-white">
            <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-blue-100 flex-shrink-0 gap-1">
              <span className="text-blue-700 font-medium text-xs leading-tight">{shortDate.month}</span>
              <span className="text-blue-700 font-semibold text-base leading-none">{shortDate.day}</span>
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <p className="font-medium text-gray-800 text-sm lg:text-base">
                {formatDateForDisplay(date)}
              </p>
              <p className="text-gray-700 text-xs lg:text-sm">
                {startTimeDisplay} - {endTimeDisplay} EST
              </p>
              <p className="text-gray-700 text-xs lg:text-sm font-medium mt-2">Join your meeting here:</p>
              <a
                href={MOCK_TEAMS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800 underline text-xs lg:text-sm break-all"
              >
                {MOCK_TEAMS_LINK}
              </a>
              <div className="flex flex-col items-start gap-3 mt-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-blue-700 text-xs lg:text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  onClick={handleCopyLink}
                >
                  <Copy className="w-4 h-4" strokeWidth={1.5} aria-hidden />
                  {copiedLink ? "Copied!" : "Copy link"}
                </button>
                <span className="text-gray-700 text-xs lg:text-sm">
                  If we can&apos;t connect, we&apos;ll call you at {phone}
                </span>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-blue-700 text-xs lg:text-sm font-medium mt-1 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                onClick={() => {}}
              >
                <Calendar className="w-4 h-4" strokeWidth={1.5} aria-hidden />
                Add to calendar
              </button>
            </div>
          </div>

          {/* Card 2: Appointment topic */}
          <div className="border border-[var(--bhds-colors-gray-200)] rounded-xl p-4 lg:p-5 flex gap-4 bg-white">
            {iconData && (
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${iconData.bgColor}`}>
                {(() => {
                  const IconComponent = iconData.icon;
                  return (
                    <IconComponent
                      className={`w-6 h-6 ${iconData.iconColor}`}
                      strokeWidth={1.5}
                    />
                  );
                })()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 text-sm lg:text-base">
                {appointmentTypeLabel}
              </p>
              {category !== "Intro to College Coach" && (
                <p className="text-gray-700 text-xs lg:text-sm mt-0.5">{topic}</p>
              )}
              <p className="text-gray-700 text-xs lg:text-sm mt-1">
                For {selectedStudent?.name}
              </p>
              {showPreviousCoachBadge && (
                <Badge variant="session" className="mt-1.5 w-fit">
                  Meeting with previous coach
                </Badge>
              )}
            </div>
          </div>

          {/* Card 3: Reschedule info */}
          <div className="rounded-xl border border-[var(--bhds-colors-blue-300)] bg-[var(--bhds-colors-blue-50)] p-4 lg:p-5 flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100">
              <AlertCircle className="w-5 h-5 text-[var(--bhds-colors-blue-700)]" aria-hidden />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm lg:text-base">Need to reschedule?</p>
              <p className="text-gray-700 text-xs lg:text-sm mt-1">
                Please note that cancellations made less than 24 hours in advance of the counseling session start time or &apos;no shows&apos; are considered sessions held.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-6 lg:mb-8 text-left">
            <div className="border border-[var(--bhds-colors-gray-200)] rounded-xl p-4 lg:p-5 flex gap-4 bg-white text-[var(--bhds-colors-gray-200)]">
              <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-blue-100 flex-shrink-0 gap-1">
                <span className="text-blue-700 font-medium text-xs leading-tight">{shortDate.month}</span>
                <span className="text-blue-700 font-semibold text-base leading-none">{shortDate.day}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm lg:text-base">
                  {formatDateForDisplay(date)}
                </p>
                <p className="text-gray-700 text-xs lg:text-sm mt-0.5">
                  {startTimeDisplay} - {endTimeDisplay} EST
                </p>
                <p className="text-gray-700 text-xs lg:text-sm mt-1">
                  We&apos;ll call you at {phone}
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-blue-700 text-xs lg:text-sm font-medium mt-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  onClick={() => {}}
                >
                  <Calendar className="w-4 h-4" strokeWidth={1.5} aria-hidden />
                  Add to calendar
                </button>
              </div>
            </div>

            <div className="border border-[var(--bhds-colors-gray-200)] rounded-xl p-4 lg:p-5 flex gap-4 bg-white text-[var(--bhds-colors-gray-200)]">
              {iconData && (
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${iconData.bgColor}`}>
                  {(() => {
                    const IconComponent = iconData.icon;
                    return (
                      <IconComponent
                        className={`w-6 h-6 ${iconData.iconColor}`}
                        strokeWidth={1.5}
                      />
                    );
                  })()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm lg:text-base">
                  {appointmentTypeLabel}
                </p>
                {category !== "Intro to College Coach" && (
                  <p className="text-gray-700 text-xs lg:text-sm mt-0.5">{topic}</p>
                )}
                <p className="text-gray-700 text-xs lg:text-sm mt-1">
                  For {selectedStudent?.name}
                </p>
                {showPreviousCoachBadge && (
                  <Badge variant="session" className="mt-1.5 w-fit">
                    Meeting with previous coach
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--bhds-colors-blue-300)] bg-[var(--bhds-colors-blue-50)] p-4 lg:p-5 mb-6 lg:mb-8 text-left flex gap-3 text-[var(--bhds-colors-blue-50)]">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-[var(--bhds-colors-blue-700)]" aria-hidden />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm lg:text-base">Need to reschedule?</p>
              <p className="text-gray-700 text-xs lg:text-sm mt-1">
                Please note that cancellations made less than 24 hours in advance of the counseling session start time or &apos;no shows&apos; are considered sessions held.
              </p>
            </div>
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
        <Button
          variant="Secondary"
          size="lg"
          onClick={onScheduleAnother}
          className="flex-1 text-sm lg:text-base text-blue-700 border border-gray-300 hover:bg-blue-50 transition-colors duration-200 ease-out rounded-lg lg:rounded-xl py-3 lg:py-4"
        >
          Schedule another
        </Button>
        <Button
          size="lg"
          onClick={onViewCalendar}
          className="flex-1 text-sm lg:text-base bg-yellow-500 hover:bg-yellow-400 text-blue-800 rounded-lg lg:rounded-xl font-semibold py-3 lg:py-4"
        >
          Manage appointments
        </Button>
      </div>
    </div>
  );
} 