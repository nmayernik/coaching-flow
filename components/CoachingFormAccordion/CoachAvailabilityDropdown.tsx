"use client"

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { UserRound, RotateCcw, ChevronDown, Check } from "lucide-react";
import { PreviousCoachSession } from "./types";
import { cn } from "@/lib/utils";
import { CoachRoleLabels, getCoachRoleLabels } from "@/lib/coachRoleLabels";

export type CoachAvailabilityValue = "all" | "previous";

interface CoachAvailabilityDropdownProps {
  value: CoachAvailabilityValue;
  onChange: (value: CoachAvailabilityValue) => void;
  onMoreDetails: () => void;
  previousCoach: PreviousCoachSession | null;
  coachRoleLabels?: CoachRoleLabels;
}

export function CoachAvailabilityDropdown({
  value,
  onChange,
  coachRoleLabels = getCoachRoleLabels(),
}: CoachAvailabilityDropdownProps) {
  const [open, setOpen] = React.useState(false);

  const triggerText = value === "previous" ? `Previous ${coachRoleLabels.titleSingular}` : `All ${coachRoleLabels.titlePlural}`;
  const ariaLabel = value === "previous"
    ? `Showing availability for ${coachRoleLabels.previous}`
    : `Showing availability for ${coachRoleLabels.all}`;

  const handleSelect = (newValue: CoachAvailabilityValue) => {
    onChange(newValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        aria-label={ariaLabel}
        aria-expanded={open}
      >
        <button
          type="button"
          className="inline-flex h-10 w-full min-w-0 items-center justify-between gap-3 rounded-lg border border-gray-300 bg-white px-3 text-left text-base font-normal text-gray-800 transition-colors hover:border-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-[230px]"
        >
          <span className="truncate">{triggerText}</span>
          <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform", open && "rotate-180")} aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] min-w-[312px] rounded-xl border border-gray-200 p-2 shadow-md"
        align="end"
        sideOffset={8}
      >
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => handleSelect("all")}
            className={cn(
              "flex w-full items-start gap-2 rounded-lg p-2 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset",
              value === "all" && "bg-blue-50"
            )}
          >
            <UserRound className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className={cn("font-medium", value === "all" ? "text-blue-700" : "text-gray-800")}>All {coachRoleLabels.titlePlural}</span>
                <Badge variant="session" className="shrink-0 px-2 py-0.5 text-xs font-medium">
                  Best Availability
                </Badge>
              </div>
              <p className={cn("mt-0.5 text-sm leading-5", value === "all" ? "text-blue-700" : "text-gray-700")}>
                Our widest selection of time slots
              </p>
            </div>
            <div className="flex w-5 shrink-0 items-center justify-end self-stretch">
              {value === "all" && (
                <Check className="h-5 w-5 text-blue-700" aria-hidden />
              )}
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelect("previous")}
            className={cn(
              "flex w-full items-start gap-2 rounded-lg p-2 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset",
              value === "previous" && "bg-blue-50"
            )}
          >
            <RotateCcw className={cn("mt-1 h-4 w-4 shrink-0", value === "previous" ? "text-blue-700" : "text-gray-700")} aria-hidden />
            <div className="flex-1 min-w-0">
              <div className={cn("font-medium", value === "previous" ? "text-blue-700" : "text-gray-800")}>Previous {coachRoleLabels.titleSingular}</div>
              <p className={cn("mt-0.5 text-sm leading-5", value === "previous" ? "text-blue-700" : "text-gray-700")}>
                Your most recent {coachRoleLabels.singular} who supports this topic
              </p>
            </div>
            <div className="flex w-5 shrink-0 items-center justify-end self-stretch">
              {value === "previous" && (
                <Check className="h-5 w-5 text-blue-700" aria-hidden />
              )}
            </div>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
