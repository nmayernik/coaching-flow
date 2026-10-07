"use client"

import { DateTimeSelector } from "./DateTimeSelector"
import { PhoneNumberSelector } from "./PhoneNumberSelector"
import { CoachAvailabilityDropdown } from "./CoachAvailabilityDropdown"
import { CoachContinuityLine } from "./CoachContinuityLine"
import { cn } from "@/lib/utils"
import type { PreviousCoachSession } from "./types"
import { getCoachRoleLabels, type CoachRoleLabels } from "@/lib/coachRoleLabels"

interface SchedulingFieldsProps {
  date: string
  time: string
  phone: string
  onDateChange: (value: string) => void
  onTimeChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onLearnMore?: () => void
  teamsCallsEnabled?: boolean
  serviceName?: string
  readOnly?: boolean
  coachContinuityEnabled?: boolean
  previousCoach?: PreviousCoachSession | null
  usePreviousCoach?: boolean
  onPreviousCoachChange?: (value: boolean) => void
  onCoachDetails?: () => void
  coachRoleLabels?: CoachRoleLabels
}

// Shared by the actual scheduling step and all six research comparison views.
export function SchedulingFields({
  date, time, phone, onDateChange, onTimeChange, onPhoneChange, onLearnMore,
  teamsCallsEnabled = false, serviceName, readOnly = false, coachContinuityEnabled = false,
  previousCoach, usePreviousCoach = false, onPreviousCoachChange, onCoachDetails,
  coachRoleLabels = getCoachRoleLabels(),
}: SchedulingFieldsProps) {
  return (
    <>
      {serviceName && (
        <section className="flex flex-col gap-2" aria-label={`About ${serviceName.toLowerCase()}`}>
          <h2 className="text-base font-semibold text-blue-800">About {serviceName.toLowerCase()}</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Your {serviceName.toLowerCase()} session takes place on Microsoft Teams with a college admissions or college finance expert.
            You can talk, chat, and share your screen. Your camera is optional.
          </p>
        </section>
      )}
      {coachContinuityEnabled && previousCoach ? (
        <>
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <span className="font-medium text-base text-gray-800">Choose a date and time <span className="text-red-500">*</span></span>
            <span className="flex min-w-0 flex-col gap-1.5 text-base text-gray-800 sm:flex-row sm:items-center sm:gap-2">
              <span className="shrink-0">Showing availability for:</span>
              <CoachAvailabilityDropdown
                value={usePreviousCoach ? "previous" : "all"}
                onChange={(value) => onPreviousCoachChange?.(value === "previous")}
                onMoreDetails={() => onCoachDetails?.()}
                previousCoach={previousCoach}
                coachRoleLabels={coachRoleLabels}
              />
            </span>
          </div>
          {usePreviousCoach && <CoachContinuityLine previousCoach={previousCoach} coachRoleLabels={coachRoleLabels} />}
          <DateTimeSelector selectedDate={date} selectedTime={time} onDateChange={onDateChange} onTimeChange={onTimeChange} selectedCoachId={usePreviousCoach ? previousCoach.coachId : null} hideSectionLabel />
        </>
      ) : (
        <DateTimeSelector selectedDate={date} selectedTime={time} onDateChange={onDateChange} onTimeChange={onTimeChange} selectedCoachId={null} readOnly={readOnly} />
      )}
      <div>
        <div className={cn("font-medium text-base text-gray-800", teamsCallsEnabled ? "mt-0.5 mb-0.5" : "mb-3")}>
          {serviceName ? "Backup phone number " : teamsCallsEnabled ? "Where should we call you if we run into issues connecting? " : "Where should we call you? "}
          <span className="text-red-500">*</span>
        </div>
        <PhoneNumberSelector phone={phone} onPhoneChange={onPhoneChange} teamsCallsMode={teamsCallsEnabled} onLearnMore={onLearnMore} serviceName={serviceName} />
      </div>
    </>
  )
}
