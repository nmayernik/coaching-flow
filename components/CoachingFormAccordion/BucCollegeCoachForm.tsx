"use client"

import * as Accordion from "@radix-ui/react-accordion"
import * as React from "react"
import Link from "next/link"
import { Calendar, CircleCheck, CircleDollarSign, Copy, ExternalLink, FileText, Video } from "lucide-react"

import { BUC_FAMILY_MEMBERS, type BucFamilyMember } from "@/lib/bucData"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CategoryCard } from "./CategoryCard"
import { DateTimeSelector } from "./DateTimeSelector"
import { PhoneNumberSelector } from "./PhoneNumberSelector"
import type { CoachingFormAccordionProps } from "./types"
import { convertValueTimeToDisplay, formatDateForDisplay } from "./utils"
import { VideoCallsDialog } from "./VideoCallsDialog"

const BUC_TOPICS = ["College Admissions", "College Finance", "Career Planning"]
const MOCK_TEAMS_LINK = "https://teams.microsoft.com/l/meetup-join/19%3ameeting_MOCK1234%40thread.v2/0?context=%7b%22Tid%22%3a%22mock_tenant_id%22%2c%22Oid%22%3a%22mock_user_id%22%7d"

export function BucCollegeCoachForm({
  onStepChange,
  onCompletedStepsChange,
  onCategoryChange,
}: CoachingFormAccordionProps) {
  const [step, setStep] = React.useState(0)
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([])
  const [selectedMember, setSelectedMember] = React.useState<BucFamilyMember | null>(null)
  const [topic, setTopic] = React.useState("")
  const [note, setNote] = React.useState("")
  const [date, setDate] = React.useState("")
  const [time, setTime] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const [attachedFileName, setAttachedFileName] = React.useState<string | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [error, setError] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isVideoCallsDialogOpen, setIsVideoCallsDialogOpen] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    onStepChange?.(step)
  }, [onStepChange, step])

  React.useEffect(() => {
    onCompletedStepsChange?.(completedSteps)
  }, [completedSteps, onCompletedStepsChange])

  React.useEffect(() => {
    onCategoryChange?.(topic)
  }, [onCategoryChange, topic])

  const handleContinue = () => {
    if (!selectedMember) {
      setError("Please select an eligible student.")
      return
    }
    if (!topic) {
      setError("Please select a topic.")
      return
    }

    setError("")
    setCompletedSteps([0])
    setStep(1)
  }

  const handleSubmit = () => {
    if (!date || !time) {
      setError("Please select a date and time.")
      return
    }
    if (!phone) {
      setError("Please select a phone number.")
      return
    }
    if (!termsAccepted) {
      setError("Please agree to the Terms and Conditions and the 2-credit charge before booking.")
      return
    }

    setError("")
    setCompletedSteps([0, 1])
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <BucBookingSuccess
        student={selectedMember}
        topic={topic}
        date={date}
        time={time}
        phone={phone}
      />
    )
  }

  return (
    <div className="mx-auto w-full font-sans">
      <Accordion.Root type="single" value={`step${step}`} className="w-full">
        {completedSteps.includes(0) ? (
          <div className="mb-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm lg:mb-4 lg:rounded-2xl lg:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium text-gray-800">{topic} appointment</p>
                <p className="mt-1 text-sm text-gray-700">
                  For {selectedMember?.name} ({selectedMember?.ageLabel.toLowerCase()}) · 45 minutes
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-600">{note || "No note added"}</p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => {
                  setCompletedSteps([])
                  setStep(0)
                  setError("")
                }}
                className="shrink-0"
              >
                Edit
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative z-10 mb-3 animate-in rounded-2xl fade-in slide-in-from-bottom-4 lg:mb-4 lg:border lg:border-gray-100 lg:bg-white lg:shadow-sm">
            <Accordion.Item value="step0" className="border-none">
              <Accordion.Header>
                <Accordion.Trigger className="hidden" />
              </Accordion.Header>
              <Accordion.Content className="space-y-6 pb-6 pt-1 lg:space-y-8 lg:px-8 lg:pb-8 lg:pt-6">
                {error && <Alert variant="destructive" className="text-sm">{error}</Alert>}

                <section aria-labelledby="buc-student-heading">
                  <h2 id="buc-student-heading" className="mb-4 text-lg font-medium text-gray-800">
                    Choose a student <span className="text-red-500">*</span>
                  </h2>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
                    {BUC_FAMILY_MEMBERS.map((member) => (
                      <BucFamilyMemberCard
                        key={member.id}
                        member={member}
                        selected={selectedMember?.id === member.id}
                        onSelect={setSelectedMember}
                      />
                    ))}
                  </div>
                </section>

                <section aria-labelledby="buc-topic-heading">
                  <h2 id="buc-topic-heading" className="mb-4 text-lg font-medium text-gray-800">
                    Choose a topic <span className="text-red-500">*</span>
                  </h2>
                  <div className="grid grid-cols-1 gap-3 p-[2px] sm:grid-cols-3 sm:gap-4 lg:gap-5">
                    {BUC_TOPICS.map((topicName) => (
                      <CategoryCard
                        key={topicName}
                        categoryName={topicName}
                        selectedStudent={null}
                        selectedCategory={topic}
                        onSelect={setTopic}
                        forceAvailable
                        hideDescription
                      />
                    ))}
                  </div>
                </section>

                <section aria-labelledby="buc-note-heading">
                  <label id="buc-note-heading" htmlFor="buc-coach-note" className="mb-3 block text-lg font-medium text-gray-800">
                    Add a note for your coach <span className="font-normal text-gray-500">(optional)</span>
                  </label>
                  <Textarea
                    id="buc-coach-note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Share any questions or context that will help your coach prepare."
                    className="min-h-[104px] text-sm lg:min-h-[120px]"
                  />
                </section>

                <Button
                  type="button"
                  size="lg"
                  onClick={handleContinue}
                  className="w-full rounded-lg bg-yellow-500 px-4 py-4 text-base font-semibold text-blue-800 hover:bg-yellow-400 sm:py-5 lg:rounded-xl lg:px-6 lg:!py-8 lg:!text-lg"
                  style={{ minHeight: "52px" }}
                >
                  Continue
                </Button>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        )}

        {step === 1 && (
          <div className="mb-3 animate-in rounded-2xl fade-in slide-in-from-bottom-4 lg:mb-4 lg:border lg:border-gray-100 lg:bg-white lg:shadow-sm">
            <Accordion.Item value="step1" className="border-none">
              <Accordion.Header>
                <Accordion.Trigger className="hidden" />
              </Accordion.Header>
              <Accordion.Content className="space-y-6 pb-6 lg:space-y-7 lg:p-6">
                {error && <Alert variant="destructive" className="text-sm">{error}</Alert>}

                <DateTimeSelector
                  selectedDate={date}
                  selectedTime={time}
                  onDateChange={setDate}
                  onTimeChange={setTime}
                  selectedCoachId={null}
                />

                <section aria-labelledby="buc-phone-heading">
                  <h2 id="buc-phone-heading" className="mb-3 text-base font-medium text-gray-800">
                    Where should we call you if we run into issues connecting? <span className="text-red-500">*</span>
                  </h2>
                  <PhoneNumberSelector
                    phone={phone}
                    onPhoneChange={setPhone}
                    teamsCallsMode
                    onLearnMore={() => setIsVideoCallsDialogOpen(true)}
                  />
                </section>

                <section aria-labelledby="buc-attachment-heading">
                  <h2 id="buc-attachment-heading" className="mb-3 text-base font-medium text-gray-800">
                    Attach a document <span className="font-normal text-gray-500">(optional)</span>
                  </h2>
                  <div
                    className={cn(
                      "flex min-h-[132px] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 text-center text-gray-800 transition-colors lg:rounded-xl",
                      isDragging && "border-blue-400 bg-blue-25",
                      "focus-within:border-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-200"
                    )}
                    onDragOver={(event) => {
                      event.preventDefault()
                      setIsDragging(true)
                    }}
                    onDragLeave={(event) => {
                      event.preventDefault()
                      setIsDragging(false)
                    }}
                    onDrop={(event) => {
                      event.preventDefault()
                      setIsDragging(false)
                      setAttachedFileName(event.dataTransfer.files?.[0]?.name ?? null)
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                      aria-label="Attach a document"
                      onChange={(event) => setAttachedFileName(event.target.files?.[0]?.name ?? null)}
                    />
                    <FileText className="h-6 w-6 text-blue-700" aria-hidden="true" />
                    <p className="text-sm text-gray-700">{attachedFileName || "Drag a file here or browse your device"}</p>
                    <Button type="button" variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
                      Browse files
                    </Button>
                  </div>
                </section>

                <CreditDisclosure />

                <div className="flex items-start gap-3 rounded-lg border border-gray-300 bg-white p-4">
                  <Checkbox
                    id="buc-credit-terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                    aria-invalid={error.includes("Terms and Conditions")}
                    className="mt-0.5 rounded-[4px]"
                  />
                  <div className="text-sm leading-6 text-gray-700">
                    <label htmlFor="buc-credit-terms" className="cursor-pointer">
                      I understand that 2 back-up care credits will be charged when I book this appointment and I agree to the
                    </label>{" "}
                    <TermsDialog />.
                  </div>
                </div>

                <Button
                  type="button"
                  size="lg"
                  onClick={handleSubmit}
                  className="w-full rounded-lg bg-yellow-500 px-4 py-4 text-base font-semibold text-blue-800 hover:bg-yellow-400 sm:py-5 lg:rounded-xl lg:px-6 lg:!py-8 lg:!text-lg"
                  style={{ minHeight: "52px" }}
                >
                  Confirm and use 2 credits
                </Button>
                <p className="text-xs leading-5 text-gray-600 lg:text-sm">
                  Your College Coach access begins when the appointment is booked and remains active for 365 days.
                </p>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        )}
      </Accordion.Root>
      <VideoCallsDialog
        isOpen={isVideoCallsDialogOpen}
        onOpenChange={setIsVideoCallsDialogOpen}
      />
    </div>
  )
}

function BucFamilyMemberCard({
  member,
  selected,
  onSelect,
}: {
  member: BucFamilyMember
  selected: boolean
  onSelect: (member: BucFamilyMember) => void
}) {
  const eligible = member.collegeCoachEligible === true

  return (
    <button
      type="button"
      disabled={!eligible}
      aria-pressed={selected}
      aria-label={`${member.name}, ${member.ageLabel}${eligible ? ", eligible for College Coach" : ", not eligible for College Coach"}`}
      onClick={() => onSelect(member)}
      className={cn(
        "flex min-h-[116px] w-full flex-col items-start justify-center rounded-xl border p-4 text-left transition-colors",
        eligible && !selected && "border-gray-400 bg-white hover:bg-gray-50",
        eligible && selected && "border-white bg-blue-50 ring-2 ring-blue-700",
        !eligible && "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400"
      )}
    >
      <span>
        <span className={cn("block font-medium", eligible ? "text-gray-800" : "text-gray-500")}>{member.name}</span>
        <span className={cn("mt-1 block text-sm", eligible ? "text-gray-700" : "text-gray-400")}>{member.ageLabel}</span>
      </span>
    </button>
  )
}

function CreditDisclosure() {
  return (
    <Alert className="border-[#9bc8dc] bg-[#eff9fd] py-5 text-[#173f54] [&>svg]:top-5">
      <CircleDollarSign className="h-5 w-5 text-[#176080]" aria-hidden="true" />
      <AlertTitle className="text-base font-semibold text-[#173f54]">2 credits will be used</AlertTitle>
      <AlertDescription className="mt-2 text-sm leading-6 text-[#385b6d]">
        <p>Booking activates College Coach for 365 days and includes this coaching session.</p>
        <ul className="mt-3 space-y-1.5 pl-5 [list-style:disc]">
          <li>Essay Reviews cost 1 credit per essay.</li>
          <li>A College List costs 1 credit and can be purchased once during your membership year.</li>
          <li>After 365 days, book another coaching session for 2 credits to renew access for another year.</li>
        </ul>
      </AlertDescription>
    </Alert>
  )
}

function TermsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800">
          Terms and Conditions
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-xl overflow-y-auto rounded-lg p-6 sm:p-7">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#173f54]">College Coach Terms and Conditions</DialogTitle>
          <DialogDescription className="pt-2 text-left leading-6 text-gray-700">
            These terms explain how back-up care credits apply to the College Coach benefit.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 text-sm leading-6 text-gray-700">
          <section>
            <h3 className="font-semibold text-gray-900">Membership activation</h3>
            <p className="mt-1">Booking your College Coach appointment uses 2 back-up care credits. This includes one coaching session and access to the College Coach app for 365 days from the booking date.</p>
          </section>
          <section>
            <h3 className="font-semibold text-gray-900">Additional services</h3>
            <p className="mt-1">Each Essay Review uses 1 credit per essay. A College List uses 1 credit and may be purchased once during each membership year.</p>
          </section>
          <section>
            <h3 className="font-semibold text-gray-900">Renewal</h3>
            <p className="mt-1">After 365 days, schedule another coaching session for 2 credits to renew College Coach app access for an additional 365 days.</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function BucBookingSuccess({
  student,
  topic,
  date,
  time,
  phone,
}: {
  student: BucFamilyMember | null
  topic: string
  date: string
  time: string
  phone: string
}) {
  const [copiedLink, setCopiedLink] = React.useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(MOCK_TEAMS_LINK)
      setCopiedLink(true)
      window.setTimeout(() => setCopiedLink(false), 2000)
    } catch {
      setCopiedLink(false)
    }
  }

  return (
    <div className="animate-in rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm fade-in slide-in-from-bottom-4 lg:rounded-2xl lg:p-8">
      <div className="mb-5 flex justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-100">
          <CircleCheck className="h-7 w-7 text-success-600" aria-hidden="true" />
        </span>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 lg:text-2xl">Your session is booked!</h2>
      <p className="mt-2 text-sm text-gray-600 lg:text-base">Your 365 days of College Coach access are now active.</p>

      <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-3 text-left">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-xs font-medium uppercase text-gray-600">Credits used</p>
          <p className="mt-1 text-2xl font-semibold text-blue-800">2</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-xs font-medium uppercase text-gray-600">Credits available</p>
          <p className="mt-1 text-2xl font-semibold text-gray-800">23</p>
        </div>
      </div>

      <div className="my-7 grid gap-4 text-left sm:grid-cols-2">
        <div className="flex gap-3 rounded-lg border border-gray-200 p-4">
          <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
          <div>
            <p className="font-medium text-gray-800">{formatDateForDisplay(date)}</p>
            <p className="mt-1 text-sm text-gray-700">{convertValueTimeToDisplay(time)} EST</p>
            <div className="mt-3 flex items-start gap-2">
              <Video className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
              <div>
                <a
                  href={MOCK_TEAMS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline underline-offset-2 hover:text-blue-800"
                >
                  Join Microsoft Teams meeting
                </a>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="mt-2 flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:underline"
                >
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  {copiedLink ? "Copied!" : "Copy meeting link"}
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-700">If we can&apos;t connect, we&apos;ll call {phone}.</p>
          </div>
        </div>
        <div className="flex gap-3 rounded-lg border border-gray-200 p-4">
          <FileText className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
          <div>
            <p className="font-medium text-gray-800">{topic}</p>
            <p className="mt-1 text-sm text-gray-700">For {student?.name}</p>
            <p className="mt-1 text-sm text-gray-700">45-minute coaching session</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="secondary" size="lg" className="flex-1">
          <Link href="/buc/">Back to Benefits</Link>
        </Button>
        <Button asChild size="lg" className="flex-1">
          <Link href="/buc/college-coach/portal/">
            Visit College Coach
            <ExternalLink aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
