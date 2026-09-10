"use client"

import { Suspense } from "react"

import { CoachingFormFeature } from "@/components/CoachingFormFeature"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function CollegeCoachBookingDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-dvh w-screen max-w-none gap-0 overflow-hidden rounded-none border-0 p-0 [&>button]:hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Book a College Coach appointment</DialogTitle>
          <DialogDescription>
            Select a student, topic, date, and time for your appointment.
          </DialogDescription>
        </DialogHeader>
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center text-[#176080]">
              Loading appointment options...
            </div>
          }
        >
          <CoachingFormFeature
            showChrome={false}
            showScenarioSwitcher={false}
            allowCoachContinuity={false}
            flowVariant="buc-college-coach"
            onRequestClose={() => onOpenChange(false)}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}
