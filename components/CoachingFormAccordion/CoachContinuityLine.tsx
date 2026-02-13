"use client"

import * as React from "react";
import { PreviousCoachSession } from "./types";

interface CoachContinuityLineProps {
  previousCoach: PreviousCoachSession;
}

function formatShortDate(isoDate: string): string {
  const date = new Date(isoDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${day}/${year}`;
}

export function CoachContinuityLine({ previousCoach }: CoachContinuityLineProps) {
  const formattedDate = formatShortDate(previousCoach.lastMeetingDate);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mb-3 text-sm text-gray-800">
      You&apos;ll be meeting with {previousCoach.coachName}. You last met on {formattedDate} for a {previousCoach.topic} appointment.
    </div>
  );
}
