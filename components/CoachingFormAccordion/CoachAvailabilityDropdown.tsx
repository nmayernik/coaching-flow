"use client"

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { User, RotateCw, ChevronDown, ChevronUp, Check } from "lucide-react";
import { PreviousCoachSession } from "./types";
import { cn } from "@/lib/utils";

export type CoachAvailabilityValue = "all" | "previous";

interface CoachAvailabilityDropdownProps {
  value: CoachAvailabilityValue;
  onChange: (value: CoachAvailabilityValue) => void;
  onMoreDetails: () => void;
  previousCoach: PreviousCoachSession | null;
}

export function CoachAvailabilityDropdown({
  value,
  onChange,
  onMoreDetails,
}: CoachAvailabilityDropdownProps) {
  const [open, setOpen] = React.useState(false);

  const triggerText = value === "previous" ? "Previous coach only" : "All coaches";
  const ariaLabel = value === "previous"
    ? "Showing availability for Previous coach only"
    : "Showing availability for All coaches";

  const handleSelect = (newValue: CoachAvailabilityValue) => {
    onChange(newValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="inline-flex items-center gap-1.5 text-sm lg:text-base font-semibold text-blue-700 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded transition-colors duration-200 ease-out"
        aria-label={ariaLabel}
        aria-expanded={open}
      >
        <button type="button">
          <span>{triggerText}</span>
          {open ? (
            <ChevronUp className="w-4 h-4 text-blue-700" aria-hidden />
          ) : (
            <ChevronDown className="w-4 h-4 text-blue-700" aria-hidden />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[min(100vw-2rem,320px)] py-1 px-2 rounded-2xl"
        align="start"
        sideOffset={6}
      >
        <div className="py-2">
          <button
            type="button"
            onClick={() => handleSelect("all")}
            className={cn(
              "w-full flex items-start gap-3 px-4 py-2.5 text-left transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset",
              value === "all" && "bg-blue-50/50"
            )}
          >
            <User className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" aria-hidden />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-gray-800">All coaches</span>
                <Badge variant="session" className="text-xs font-medium shrink-0">
                  Recommended
                </Badge>
              </div>
              <p className="text-sm text-gray-700 mt-0.5">
                We&apos;ll assign a coach based on availability and share all your previous notes with them.
              </p>
            </div>
            <div className="flex-shrink-0 w-6 flex justify-end items-center self-stretch">
              {value === "all" && (
                <Check className="w-5 h-5 text-blue-700" aria-hidden />
              )}
            </div>
          </button>

          <div className="my-2 border-t border-gray-200" aria-hidden />

          <button
            type="button"
            onClick={() => handleSelect("previous")}
            className={cn(
              "w-full flex items-start gap-3 px-4 py-2.5 text-left transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset",
              value === "previous" && "bg-blue-50/50"
            )}
          >
            <RotateCw className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" aria-hidden />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800">Previous coach only</div>
              <p className="text-sm text-gray-700 mt-0.5">
                We&apos;ll assign a coach that you&apos;ve worked with before.
              </p>
            </div>
            <div className="flex-shrink-0 w-6 flex justify-end items-center self-stretch">
              {value === "previous" && (
                <Check className="w-5 h-5 text-blue-700" aria-hidden />
              )}
            </div>
          </button>
        </div>

        <div className="border-t border-gray-200 px-4 py-2">
          <button
            type="button"
            onClick={() => {
              onMoreDetails();
              setOpen(false);
            }}
            className="text-sm font-medium text-blue-700 hover:text-blue-800 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded transition-colors duration-200 ease-out"
          >
            More details
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
