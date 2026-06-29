"use client"

import * as React from "react";
import { Info } from "lucide-react";
import { PreviousCoachSession } from "./types";
import { CoachRoleLabels, getCoachRoleLabels } from "@/lib/coachRoleLabels";

interface CoachContinuityLineProps {
  previousCoach: PreviousCoachSession;
  coachRoleLabels?: CoachRoleLabels;
}

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function CoachContinuityLine({ previousCoach, coachRoleLabels = getCoachRoleLabels() }: CoachContinuityLineProps) {
  const formattedDate = formatDate(previousCoach.lastMeetingDate);

  return (
    <div className="mb-3 flex items-start gap-3 rounded-xl border border-blue-300 bg-blue-50 p-4 text-gray-800">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden />
      <div className="min-w-0 text-base leading-6">
        <p className="font-semibold">Booking with your {coachRoleLabels.previous}, {previousCoach.coachName}</p>
        <p className="mt-1 font-normal">
          Your last session with {previousCoach.coachName} was on {formattedDate} about {previousCoach.topic}.
        </p>
      </div>
    </div>
  );
}
