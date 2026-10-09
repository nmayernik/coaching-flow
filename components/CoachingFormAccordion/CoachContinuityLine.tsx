"use client";

import { PreviousCoachSession } from "./types";
import { CoachRoleLabels } from "@/lib/coachRoleLabels";
import { parseLocalDate } from "@/lib/booking";

interface CoachContinuityLineProps {
  previousCoach: PreviousCoachSession;
  coachRoleLabels?: CoachRoleLabels;
}

export function CoachContinuityLine({
  previousCoach,
}: CoachContinuityLineProps) {
  const formattedDate = parseLocalDate(
    previousCoach.lastMeetingDate,
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div
      className="rounded-xl border border-blue-300 bg-blue-25 px-3 py-2 text-sm leading-6 text-gray-800"
      role="status"
    >
      <p className="font-semibold">
        Viewing {previousCoach.coachDisplayName ?? previousCoach.coachName}
        &apos;s availability
      </p>
      <p className="mt-1">
        Last session with {previousCoach.coachName}: {previousCoach.topic} on{" "}
        {formattedDate}
      </p>
    </div>
  );
}
