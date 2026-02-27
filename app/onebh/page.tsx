"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Search,
} from "lucide-react"
import { CoachingFormFeature } from "@/components/CoachingFormFeature"
import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/logo"

function OneBhPageContent() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const searchParams = useSearchParams()
  const isBigCCoaching = searchParams.get("scenario") === "big-c-coaching"

  useEffect(() => {
    if (isBookingOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isBookingOpen])

  return (
    <div className="min-h-screen bg-white text-[#1A475F]">
      <header className="border-b border-[#dddddd] bg-white">
        <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-7 md:px-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-sm font-semibold text-[#1A475F]">myBrightHorizons.</span>
            </div>
            <nav className="hidden items-center gap-2 md:flex">
              <TopTab label="Home" active />
              <TopTab label="My Benefits" withIcon />
              <TopTab label="Resources" />
            </nav>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <NavIconButton icon={<Search className="h-4 w-4" />} />
            <NavIconButton icon={<CalendarDays className="h-4 w-4" />} />
            <NavIconButton icon={<Grid3X3 className="h-4 w-4" />} />
            <div className="ml-1 flex items-center gap-2 rounded-full bg-[#f2f2f2] px-2 py-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A475F] text-xs font-semibold text-white">
                PS
              </div>
              <span className="hidden text-sm font-semibold text-[#1A475F] sm:inline">Account</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-[#d7eaf4] to-white pb-10">
          <div className="mx-auto w-full max-w-[1440px] px-6 pt-8 md:px-10">
            <h1 className="text-3xl font-bold text-[#1A475F]">Good afternoon, Peter</h1>
          </div>

          <div className="mx-auto mt-6 grid w-full max-w-[1440px] gap-6 px-6 md:grid-cols-[384px_1fr] md:px-10">
            <section className="overflow-hidden rounded-3xl bg-[#01784A] shadow-sm">
              <div className="h-44 bg-gradient-to-r from-[#7fb4d0] to-[#5d8da7]" />
              <div className="space-y-6 p-6">
                <div>
                  <h2 className="text-[30px] font-bold text-white">School&apos;s out? Fun is in.</h2>
                  <p className="mt-2 text-base text-white">
                    Fill your child&apos;s school holidays and breaks with camp they&apos;ll love.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <CircleIcon icon={<ChevronLeft className="h-4 w-4" />} />
                  <div className="flex gap-2 rounded-xl bg-black/25 px-2 py-1">
                    <div className="h-2 w-2 rounded-full bg-white" />
                    <div className="h-2 w-2 rounded-full bg-[#808080]" />
                    <div className="h-2 w-2 rounded-full bg-[#808080]" />
                  </div>
                  <CircleIcon icon={<ChevronRight className="h-4 w-4" />} />
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <h2 className="text-base font-bold text-[#707070]">Benefit Summary</h2>
                <div className="flex w-full flex-wrap gap-2 rounded-lg bg-[#fafafa] p-1 lg:w-auto">
                  <BenefitTab label="Back-Up Care" />
                  <BenefitTab label={isBigCCoaching ? "Coaching" : "College Coach"} active />
                  <BenefitTab label="EdAssist" />
                  <BenefitTab label="Center Care" />
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-[#f2f2f2] p-6">
                <div className="grid gap-6 md:grid-cols-[1fr_220px]">
                  <div>
                    {isBigCCoaching ? (
                      <>
                        <h3 className="text-[32px] font-bold text-[#1A475F]">Coaching Hub</h3>
                        <p className="mt-3 max-w-xl text-base text-[#707070]">
                          Supporting the success of you and your family across education, career, financial wellness and more.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                          <Button
                            type="button"
                            className="bg-[#f0bd1b] text-[#1A475F] hover:bg-[#f2c840]"
                            onClick={() => setIsBookingOpen(true)}
                          >
                            Book Appointment
                          </Button>
                          <Button type="button" variant="secondary" className="border-[#b3b3b3] text-[#215A78]">
                            Learn More
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                    <h3 className="text-[18px] font-bold text-[#1A475F]">College Coach</h3>
                    <div className="mt-1 flex items-end gap-2">
                      <p className="text-[32px] font-bold leading-none text-[#1A475F]">3/3</p>
                      <p className="pb-1 text-base text-[#1A475F]">appointments remaining</p>
                    </div>
                    <p className="mt-3 max-w-xl text-base text-[#707070]">
                      Get guidance on admissions strategy, essay planning, and financial aid milestones.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button
                        type="button"
                        className="bg-[#f0bd1b] text-[#1A475F] hover:bg-[#f2c840]"
                        onClick={() => setIsBookingOpen(true)}
                      >
                        Book Appointment
                      </Button>
                      <Button type="button" variant="secondary" className="border-[#b3b3b3] text-[#215A78]">
                        Learn More
                      </Button>
                    </div>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 self-end">
                    <div className="h-16 rounded-lg bg-[#d7eaf4]" />
                    <div className="h-16 rounded-lg bg-[#ebf4fa]" />
                    <div className="h-16 rounded-lg bg-[#e8eef4]" />
                    <div className="h-16 rounded-lg bg-[#dbe6f2]" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="mx-auto mt-8 grid w-full max-w-[1440px] gap-6 px-6 md:grid-cols-2 md:px-10">
            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#707070]">Upcoming</h3>
              <div className="mt-4 flex items-center gap-4 rounded-lg border border-[#f2f2f2] p-5">
                <div className="flex h-[88px] w-[88px] flex-col items-center justify-center rounded-lg bg-[#ebf4fa] text-[#1A475F]">
                  <p className="text-lg font-semibold">FEB</p>
                  <p className="text-[32px] font-semibold leading-none">21</p>
                </div>
                <div>
                  <span className="rounded-full bg-[#f1f7ee] px-2.5 py-1 text-xs font-medium text-[#476831]">Webinar</span>
                  <p className="mt-2 text-lg font-semibold text-[#1A475F]">Free Coaching for Your Education</p>
                  <p className="text-sm text-[#707070]">WED · 5:00 PM to 5:30 PM</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#707070]">My Family</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-[#f2f2f2] p-4 text-center">
                  <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#B11F59] text-[28px] font-semibold text-white">
                    PS
                  </div>
                  <p className="mt-3 text-lg font-semibold text-[#1A475F]">Peter Smith</p>
                </div>
                <div className="rounded-lg border border-[#f2f2f2] p-4">
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <AvatarBadge label="ZK" bg="#F2C840" fg="#1A475F" />
                    <AvatarBadge label="JJ" bg="#1A475F" fg="#FFFFFF" />
                    <AvatarBadge label="+2" bg="#B11F59" fg="#FFFFFF" />
                  </div>
                  <p className="mt-4 text-center text-lg font-semibold text-[#1A475F]">4 Dependents</p>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#1A475F] to-[#2C78A0] py-14 text-white">
          <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
            <h2 className="text-center text-4xl font-bold">Discover 30+ benefits</h2>
            <p className="mt-1 text-center text-xl">Find something new with Bright Horizons</p>

            <div className="mt-10 flex items-end justify-between">
              <h3 className="text-xl font-bold">Recommended</h3>
              <button className="inline-flex items-center gap-1 text-base font-bold">
                See all
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <DiscoverCard title="Senior Services" subtitle="Compare and understand support options" />
              <DiscoverCard title="Education and Career Assistance" subtitle="Tuition support and expert coaching" />
              <DiscoverCard title="Steve & Kate's Camp" subtitle="Get daily summer camp options and savings" />
            </div>

            <h3 className="mt-10 text-xl font-bold">Explore</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ExploreCard title="Education" subtitle="18 Benefits" />
              <ExploreCard title="Care" subtitle="12 Benefits" />
              <ExploreCard title="All Benefits" subtitle="32 Benefits" />
              <ExploreCard title="Saved" subtitle="0 Benefits" />
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#2C78A0] to-[#1A475F] py-10 text-white">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-4 px-6 md:px-10">
            <p className="text-lg font-bold">Looking for some pointers? Take our step-by-step tour</p>
            <Button type="button" variant="secondary" className="border-white bg-white text-[#215A78] hover:bg-[#ebf4fa]">
              Start tour
            </Button>
          </div>
        </section>

        <footer className="bg-white">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-6 text-sm text-[#333333] md:px-10">
            Your last login was yesterday at 10:46pm
          </div>
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 border-t border-[#f2f2f2] px-6 py-12 md:px-10">
            <div className="grid gap-8 md:grid-cols-4">
              <FooterColumn title="Explore" links={["Education", "Care", "Saved", "Explore All Benefits"]} />
              <FooterColumn title="Access" links={["Back-Up Care", "EdAssist", "College Coach", "Center Finder"]} />
              <FooterColumn title="Resources" links={["Articles", "Webinars", "Videos", "Activities"]} />
              <FooterColumn title="Account" links={["Profile", "Life Stages", "Help"]} />
            </div>
            <div className="flex flex-col items-start justify-between gap-3 border-t border-[#c8c8c8] pt-8 text-sm text-[#464646] md:flex-row md:items-center">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#f0bd1b]" />
                <span className="font-semibold text-[#1A475F]">Bright Horizons</span>
              </div>
              <p>© 2024 Bright Horizons Family Solutions. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      {isBookingOpen && (
        <div className="fixed inset-0 z-[100] flex h-screen flex-col overflow-hidden bg-[#f5f7fb]">
          <CoachingFormFeature
            scenarioCatalogKey="onebh"
            showChrome={false}
            showScenarioSwitcher={false}
            onRequestClose={() => setIsBookingOpen(false)}
          />
        </div>
      )}
    </div>
  )
}

function OneBhPageFallback() {
  return (
    <div className="min-h-screen bg-white text-[#1A475F]">
      <header className="border-b border-[#dddddd] bg-white">
        <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-7 md:px-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-sm font-semibold text-[#1A475F]">myBrightHorizons.</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[#707070]">Loading...</p>
      </main>
    </div>
  )
}

export default function OneBhPage() {
  return (
    <Suspense fallback={<OneBhPageFallback />}>
      <OneBhPageContent />
    </Suspense>
  )
}

function TopTab({ label, active = false, withIcon = false }: { label: string; active?: boolean; withIcon?: boolean }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-base font-semibold ${
        active ? "bg-[#EBF4FA] text-[#215A78]" : "bg-white text-[#215A78]"
      }`}
    >
      {label}
      {withIcon && <ChevronDown className="h-4 w-4" />}
    </button>
  )
}

function NavIconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button type="button" className="rounded-md p-2 text-[#1A475F] transition-colors duration-200 ease hover:bg-[#f2f2f2]">
      {icon}
    </button>
  )
}

function CircleIcon({ icon }: { icon: React.ReactNode }) {
  return <button className="rounded-full bg-black/25 p-2 text-white">{icon}</button>
}

function BenefitTab({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={`rounded-md px-3 py-2 text-sm font-semibold ${
        active ? "bg-[#EBF4FA] text-[#215A78]" : "text-[#808080]"
      }`}
    >
      {label}
    </button>
  )
}

function AvatarBadge({ label, bg, fg }: { label: string; bg: string; fg: string }) {
  return (
    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full text-sm font-extrabold" style={{ backgroundColor: bg, color: fg }}>
      {label}
    </div>
  )
}

function DiscoverCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <article className="rounded-xl border border-[#c8c8c8] bg-white p-4 text-[#1A475F] shadow-sm">
      <div className="h-24 rounded-lg bg-[#ebf4fa]" />
      <h4 className="mt-4 text-lg font-bold text-[#215A78]">{title}</h4>
      <p className="mt-1 text-base text-[#707070]">{subtitle}</p>
    </article>
  )
}

function ExploreCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <article className="rounded-xl border border-[#c8c8c8] bg-white p-4 text-center shadow-sm">
      <div className="mx-auto h-24 w-24 rounded-full bg-[#ebf4fa]" />
      <h4 className="mt-4 text-lg font-bold text-[#215A78]">{title}</h4>
      <p className="text-base text-[#707070]">{subtitle}</p>
    </article>
  )
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-[#808080]">{title}</h4>
      <div className="mt-3 space-y-2">
        {links.map((link) => (
          <p key={link} className="text-base font-semibold text-[#707070]">
            {link}
          </p>
        ))}
      </div>
    </div>
  )
}
