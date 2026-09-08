"use client"

import Image from "next/image"
import Link from "next/link"
import { Suspense, useState } from "react"
import { ArrowRight, Check, ChevronLeft, GraduationCap } from "lucide-react"

import { CoachingFormFeature } from "@/components/CoachingFormFeature"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const coachingTopics = [
  "Build a balanced college list",
  "Create an application timeline",
  "Strengthen essays and applications",
  "Understand financial aid and college costs",
]

export function CollegeCoachBenefit() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white text-[#2f3033]">
      <div className="bg-[#f7fbfe]">
        <div className="mx-auto flex h-[64px] w-full max-w-[960px] items-center px-5 sm:px-8">
          <Link
            href="/buc/"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#0577b9] transition-colors hover:text-[#035f94]"
          >
            <ChevronLeft aria-hidden="true" />
            All benefits
          </Link>
        </div>
      </div>

      <section className="relative isolate min-h-[430px] overflow-hidden bg-[#123f58] sm:min-h-[500px]" aria-labelledby="college-coach-title">
        <Image
          src="/buc/college-coach-hero.png"
          alt="A high school student and parent meeting with a college counselor online"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#123f58]/95 via-[#123f58]/80 to-[#123f58]/5" />
        <div className="relative mx-auto flex min-h-[430px] w-full max-w-[1232px] items-center px-5 py-16 sm:min-h-[500px] sm:px-8 lg:px-10">
          <div className="max-w-[570px] text-white">
            <span className="mb-5 inline-flex size-12 items-center justify-center rounded-full bg-[#f8d447] text-[#123f58]">
              <GraduationCap aria-hidden="true" />
            </span>
            <p className="mb-3 text-sm font-semibold uppercase text-[#d8f1fb]">Education benefit</p>
            <h1 id="college-coach-title" className="text-4xl font-semibold leading-tight sm:text-5xl">College Coach</h1>
            <p className="mt-5 max-w-[520px] text-lg leading-7 text-white sm:text-xl sm:leading-8">
              One-on-one guidance that helps your high school student move from college questions to a clear plan.
            </p>
            <Button
              type="button"
              size="lg"
              onClick={() => setBookingOpen(true)}
              className="mt-8 h-12 px-6 text-base"
            >
              Book your first appointment
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-[#f4fafc]">
        <div className="mx-auto grid w-full max-w-[1232px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase text-[#176080]">Who is eligible</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#173f54]">Support for the high school years</h2>
            <p className="mt-5 text-lg leading-8 text-[#4c535d]">
              College Coach is available for high school students ages 14-18 through your Bright Horizons benefits.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {coachingTopics.map((topic) => (
              <div key={topic} className="flex min-h-[88px] items-start gap-3 rounded-lg border border-[#c9dce5] bg-white p-5">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e8f6fc] text-[#176080]">
                  <Check aria-hidden="true" />
                </span>
                <p className="font-semibold leading-6 text-[#284c5f]">{topic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1232px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20" aria-labelledby="how-it-works-title">
        <div className="max-w-[760px]">
          <h2 id="how-it-works-title" className="text-3xl font-semibold text-[#173f54]">Personal guidance for what comes next</h2>
          <p className="mt-5 text-lg leading-8 text-[#4c535d]">
            Meet with a college admissions expert who can help your family prioritize decisions, answer questions, and turn the process into manageable next steps. Your first appointment starts with the student and topic you want to focus on.
          </p>
          <Button type="button" size="lg" onClick={() => setBookingOpen(true)} className="mt-8 h-12 px-6 text-base">
            Book your first appointment
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        </div>
      </section>

      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="h-dvh w-screen max-w-none gap-0 overflow-hidden rounded-none border-0 p-0 [&>button]:hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Book a College Coach appointment</DialogTitle>
            <DialogDescription>Select a student, focus area, date, and time for your first appointment.</DialogDescription>
          </DialogHeader>
          <Suspense fallback={<div className="flex h-full items-center justify-center text-[#176080]">Loading appointment options...</div>}>
            <CoachingFormFeature
              showChrome={false}
              showScenarioSwitcher={false}
              allowCoachContinuity={false}
              onRequestClose={() => setBookingOpen(false)}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
    </main>
  )
}
