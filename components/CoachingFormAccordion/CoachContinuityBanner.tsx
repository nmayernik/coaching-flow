"use client"

import * as React from "react";
import { Button } from "bhds-react/button";
import { PreviousCoachSession } from "./types";
import { Calendar, RotateCw } from "lucide-react";

interface CoachContinuityBannerProps {
  previousCoach: PreviousCoachSession | null;
  isPreviousCoachSelected: boolean;
  onToggle: () => void;
  onMoreDetails: () => void;
}

export function CoachContinuityBanner({
  previousCoach,
  isPreviousCoachSelected,
  onToggle,
  onMoreDetails
}: CoachContinuityBannerProps) {
  if (!previousCoach) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'numeric', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg lg:rounded-xl p-4 lg:p-5 mb-4 lg:mb-6">
      {!isPreviousCoachSelected ? (
        // Default state: Any coach
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            <div className="text-sm lg:text-base font-medium text-gray-800 mb-1">
              Showing availability for all coaches.
            </div>
            <div className="text-xs lg:text-sm text-gray-700">
              We share notes from any past sessions.
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 text-blue-700">
            <Button variant="Tertiary" size="md" onClick={onMoreDetails}>
              More details
            </Button>
            <Button variant="Secondary" size="md" onClick={onToggle}>
              Switch to your previous coach
            </Button>
          </div>
        </div>
      ) : (
        // Active state: Previous coach selected
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="text-sm lg:text-base font-medium text-gray-900 mb-2">
              Matching you with a previous coach
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <RotateCw className="w-5 h-5 text-blue-700 flex-shrink-0" aria-hidden="true" />
                <div className="text-sm lg:text-base font-medium text-gray-900">
                  You'll be meeting with {previousCoach.coachName}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-700 flex-shrink-0" aria-hidden="true" />
                <div className="text-sm lg:text-base font-medium text-gray-900">
                  You last met on {formatDate(previousCoach.lastMeetingDate)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 text-blue-700">
            <Button variant="Tertiary" size="md" onClick={onMoreDetails}>
              More details
            </Button>
            <Button variant="Secondary" size="md" onClick={onToggle}>
              Switch to any coach
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
