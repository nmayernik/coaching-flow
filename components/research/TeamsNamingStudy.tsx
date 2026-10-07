"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { CoachingFormFeature } from "@/components/CoachingFormFeature"
import { SchedulingFields } from "@/components/CoachingFormAccordion/SchedulingFields"
import { Step1Summary, Step2Summary } from "@/components/CoachingFormAccordion/SummaryComponents"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useTeamsNamingStudy } from "@/contexts/TeamsNamingStudyContext"
import { NAMING_VARIANTS, getBookingHeading, getExampleBooking, getNamingVariant, STUDY_STORAGE_KEY, type NamingVariantId } from "@/lib/teamsNamingStudy"

const noop = () => {}

export function StudyHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <Image src="/BHLogo@2x.png" alt="Bright Horizons" width={189} height={32} priority />
        <span className="text-sm font-semibold text-blue-800">College Coach</span>
      </div>
    </header>
  )
}

export function StudyBookingPage() {
  return <><StudyHeader /><CoachingFormFeature showChrome={false} showScenarioSwitcher={false} /></>
}

export function StudyComparisonPage() {
  const study = useTeamsNamingStudy()!
  const [active, setActive] = useState<NamingVariantId>(study.session.comparisonOrder[0])
  const [viewed, setViewed] = useState<NamingVariantId[]>([study.session.comparisonOrder[0]])
  const booking = study.session.booking ?? getExampleBooking()

  function selectVariant(value: string) {
    const id = value as NamingVariantId
    setActive(id)
    setViewed(current => current.includes(id) ? current : [...current, id])
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <StudyHeader />
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-2">
          <h1 className="text-2xl font-semibold text-blue-800">Compare the service names</h1>
          <p className="text-base text-muted-foreground">Review each name in the booking screen below. The service and booking details stay the same. You don’t need to book again. Return to UserTesting to answer the next questions.</p>
          {!study.session.booking && <p role="status" className="text-sm text-muted-foreground">Your earlier booking wasn’t available in this browser, so these examples use a fictional booking for Alex.</p>}
        </div>
        <Tabs value={active} onValueChange={selectVariant} className="space-y-6">
          <TabsList aria-label="Service names" className="grid h-auto w-full grid-cols-2 gap-2 bg-transparent p-0 sm:grid-cols-3">
            {study.session.comparisonOrder.map(id => (
              <TabsTrigger key={id} value={id} className="min-h-14 whitespace-normal rounded-lg border border-border bg-background px-3 py-3 text-sm text-foreground data-[state=active]:border-blue-700 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800 data-[state=active]:ring-1 data-[state=active]:ring-blue-700">{getNamingVariant(id).name}</TabsTrigger>
            ))}
          </TabsList>
          {study.session.comparisonOrder.map((id, index) => (
            <TabsContent key={id} value={id} className="mt-0">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-16">
                <aside className="space-y-4 lg:col-span-1">
                  <h2 className="text-2xl font-semibold text-blue-800">{getBookingHeading(id)}</h2>
                  <p className="text-sm text-muted-foreground">Option {index + 1} of 6</p>
                  <ol className="hidden space-y-6 text-sm text-gray-700 lg:block" aria-label="Booking steps">
                    <li>1. Student and topic · Complete</li>
                    <li>2. Focus area · Complete</li>
                    <li className="font-semibold text-blue-800">3. Date and time</li>
                  </ol>
                </aside>
                <div className="lg:col-span-3">
                  <fieldset disabled className="min-w-0">
                    <legend className="sr-only">Booking example for {getNamingVariant(id).name}</legend>
                    <Step1Summary selectedStudent={booking.selectedStudent} category={booking.category} onEdit={noop} />
                    <Step2Summary topic={booking.topic} note="" onEdit={noop} />
                    <div className="space-y-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm lg:p-6">
                      <SchedulingFields date={booking.date} time={booking.time} phone={booking.phone} onDateChange={noop} onTimeChange={noop} onPhoneChange={noop} teamsCallsEnabled serviceName={getNamingVariant(id).name} readOnly />
                      <Button type="button" size="lg" className="w-full bg-yellow-500 text-blue-800">Confirm and book</Button>
                    </div>
                  </fieldset>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <p role="status" className="text-sm text-muted-foreground">{viewed.length} of 6 names viewed{viewed.length === 6 ? ". Return to UserTesting to share your feedback." : ". Select each name above to review it."}</p>
      </main>
    </div>
  )
}

// This index is for the researcher. The participant booking has no link to it.
export function StudyPreviewPage() {
  const study = useTeamsNamingStudy()!
  function resetStudy() {
    try { localStorage.removeItem(STUDY_STORAGE_KEY) } catch { /* Fresh context still works without storage. */ }
    window.location.assign("/research/teams-naming")
  }
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <StudyHeader />
      <main className="mx-auto max-w-3xl space-y-8 px-6 py-10">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-blue-800">Teams naming study · Researcher preview</h1>
          <p className="text-muted-foreground">Use the random booking link and comparison link in UserTesting. The fixed links below are for checking the six variants.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button asChild><Link href="/research/teams-naming">Participant booking</Link></Button>
          <Button asChild variant="secondary"><Link href="/research/teams-naming/compare">Participant comparison</Link></Button>
          <Button onClick={resetStudy} variant="secondary">Reset and start fresh</Button>
        </div>
        <div className="rounded-xl border border-border bg-background p-5">
          <h2 className="mb-4 text-lg font-semibold">Fixed booking variants</h2>
          <ul className="space-y-3">
            {NAMING_VARIANTS.map(variant => <li key={variant.id}><Link className="font-medium text-blue-700 underline" href={`/research/teams-naming?variant=${variant.id}`}>{variant.id} · {variant.name}</Link></li>)}
          </ul>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Current first name: {study.serviceName}. Comparison order: {study.session.comparisonOrder.map(id => getNamingVariant(id).name).join(" → ")}.</p>
          <p>Keep both participant links on this deployment’s domain. A browser stores the assignment, comparison order, and fictional booking for up to 72 hours. A new private browser context gives a fresh assignment.</p>
          <p>The Teams join action is a local preview. No real appointment is created.</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <a className="font-medium text-blue-700 underline" href="/research-materials/teams-naming-user-testing.md" download>Download UserTesting script</a>
          <a className="font-medium text-blue-700 underline" href="/research-materials/teams-naming-results.csv" download>Download results worksheet</a>
          <a className="font-medium text-blue-700 underline" href="/research-materials/teams-naming-readout.md" download>Download readout template</a>
        </div>
      </main>
    </div>
  )
}
