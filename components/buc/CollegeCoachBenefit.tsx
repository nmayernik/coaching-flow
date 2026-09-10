"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, ChevronDown, ChevronLeft } from "lucide-react"

import { CollegeCoachBookingDialog } from "@/components/buc/CollegeCoachBookingDialog"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

const benefitDetails = [
  "Available for high school students ages 14-18.",
  "Includes 365 days of College Coach app access.",
  "Includes one 45-minute coaching session.",
]

const howItWorks = [
  {
    title: "Book a coaching session",
    description: "Choose your student, a topic, and a time that works for your family.",
  },
  {
    title: "Get expert college guidance",
    description: "Meet one-on-one with a College Coach expert for a focused 45-minute session.",
  },
  {
    title: "Use College Coach for a full year",
    description: "Your app access stays active for 365 days. Book another session to renew for another year.",
  },
]

export function CollegeCoachBenefit() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [creditsOpen, setCreditsOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#edf8ff_0,_#f8fcff_42%,_#f7fbfe_82%)] text-[#2f3033]">
      <div className="mx-auto w-full max-w-[1024px] px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-12">
        <Link
          href="/buc/"
          className="inline-flex min-h-10 items-center gap-2 text-[15px] font-semibold text-[#176080] transition-colors hover:text-[#0f4d69] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176080] focus-visible:ring-offset-2"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          Back to all benefits
        </Link>

        <div className="mt-6 space-y-8 sm:mt-7 sm:space-y-9">
          <section
            className="overflow-hidden rounded-[18px] border border-[#d9dde0] bg-white shadow-[0_1px_2px_rgba(20,58,78,0.04)]"
            aria-labelledby="college-coach-title"
          >
            <div className="relative h-[220px] w-full sm:h-[312px]">
              <Image
                src="/buc/college-coach-hero.png"
                alt="A high school student and parent meeting with a college counselor online"
                fill
                priority
                sizes="(max-width: 640px) 100vw, 960px"
                className="object-cover object-[56%_45%]"
              />
            </div>
            <div className="px-6 py-7 sm:px-8 sm:py-8">
              <h1 id="college-coach-title" className="text-[28px] font-semibold leading-9 text-[#173f54]">
                College Coach
              </h1>
              <p className="mt-2 text-[17px] leading-7 text-[#6a7180] sm:text-lg">
                Personal college guidance for high school students ages 14-18
              </p>
            </div>
          </section>

          <section
            className="rounded-[18px] border border-[#d9dde0] bg-white px-6 py-8 shadow-[0_1px_2px_rgba(20,58,78,0.04)] sm:px-8 sm:py-9"
            aria-labelledby="usage-rate-heading"
          >
            <p className="inline-flex rounded-full bg-[#173f54] px-4 py-2 text-xs font-semibold uppercase leading-none text-white">
              Usage rate
            </p>
            <h2 id="usage-rate-heading" className="mt-5 max-w-[820px] text-[25px] font-semibold leading-[1.35] text-[#173f54] sm:text-[28px]">
              Two credits give you one year of College Coach access and one coaching session.
            </h2>

            <ul className="mt-5 space-y-2 pl-6 text-[16px] leading-6 text-[#6a7180] [list-style:disc] sm:text-[17px]">
              {benefitDetails.map((detail) => (
                <li key={detail} className="pl-1">{detail}</li>
              ))}
            </ul>

            <div className="my-6 h-px bg-[#d9dde0]" />

            <p className="text-[16px] leading-6 text-[#6a7180] sm:text-[17px]">
              <span className="font-semibold text-[#173f54]">Credit cost:</span> 2 back-up care credits
            </p>

            <Collapsible open={creditsOpen} onOpenChange={setCreditsOpen} className="mt-6">
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="flex min-h-[92px] w-full items-center justify-between gap-4 rounded-[16px] bg-[#f5fafc] px-6 py-5 text-left text-[18px] font-semibold text-[#173f54] transition-colors hover:bg-[#edf7fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176080] focus-visible:ring-offset-2 sm:px-8 sm:text-[20px]"
                >
                  <span>You have 25 credits available</span>
                  <ChevronDown
                    className={cn("h-6 w-6 shrink-0 text-[#111827] transition-transform duration-200", creditsOpen && "rotate-180")}
                    aria-hidden="true"
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-2 pt-5 text-[15px] leading-6 text-[#5f6877] data-[state=open]:animate-in data-[state=open]:fade-in sm:px-8 sm:text-base">
                <p>After booking your first session, you will have 23 credits remaining.</p>
                <p className="mt-2">Essay Reviews cost 1 credit per essay. One College List is available for 1 credit during each membership year.</p>
              </CollapsibleContent>
            </Collapsible>
          </section>

          <section
            className="rounded-[18px] border border-[#d9dde0] bg-white px-6 py-8 shadow-[0_1px_2px_rgba(20,58,78,0.04)] sm:px-8 sm:py-9"
            aria-labelledby="how-it-works-title"
          >
            <h2 id="how-it-works-title" className="text-[25px] font-semibold leading-8 text-[#173f54] sm:text-[27px]">
              How it works
            </h2>

            <ol className="mt-7 space-y-7">
              {howItWorks.map((item, index) => (
                <li key={item.title} className="flex items-start gap-4 sm:gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#173f54] text-base font-semibold text-white">
                    {index + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-[17px] font-semibold leading-6 text-[#173f54] sm:text-lg">{item.title}</h3>
                    <p className="mt-1 text-[15px] leading-6 text-[#6a7180] sm:text-base">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Button
              type="button"
              size="lg"
              onClick={() => setBookingOpen(true)}
              className="mt-8 h-12 w-full px-6 text-base sm:w-auto"
            >
              Book your first appointment
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </section>
        </div>
      </div>

      <CollegeCoachBookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />
    </main>
  )
}
