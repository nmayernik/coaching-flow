"use client"

import * as React from "react"
import Link from "next/link"
import {
  CalendarDays,
  ChevronLeft,
  Clock3,
  FileText,
  ListChecks,
  Video,
  WalletCards,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BUC_FAMILY_MEMBERS } from "@/lib/bucData"

const eligibleStudents = BUC_FAMILY_MEMBERS.filter(
  (member) => member.collegeCoachEligible
)

const MOCK_TEAMS_LINK =
  "https://teams.microsoft.com/l/meetup-join/19%3ameeting_MOCK1234%40thread.v2/0?context=%7b%22Tid%22%3a%22mock_tenant_id%22%2c%22Oid%22%3a%22mock_user_id%22%7d"

export function CollegeCoachPortal() {
  const [studentId, setStudentId] = React.useState(
    eligibleStudents[0]?.id ?? ""
  )
  const selectedStudent = eligibleStudents.find(
    (student) => student.id === studentId
  )

  return (
    <div className="min-h-screen bg-[#f7fafc] text-[#173f54]">
      <header className="border-b border-[#dce6eb] bg-white">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link
            href="/buc/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#176080] underline-offset-4 hover:underline"
          >
            <ChevronLeft aria-hidden="true" />
            Back to Benefits
          </Link>
          <p className="text-sm font-medium text-[#4c6470]">
            23 credits available
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-[#176080]">College Coach</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#173f54] sm:text-4xl">
              Welcome back, {selectedStudent?.name.split(" ")[0] ?? "student"}
            </h1>
            <p className="mt-2 text-base text-[#5e7079]">
              Your College Coach membership is active.
            </p>
          </div>

          <div className="w-full sm:max-w-[320px]">
            <label
              htmlFor="college-coach-student"
              className="mb-2 block text-sm font-semibold text-[#2b4857]"
            >
              Eligible student
            </label>
            <Select value={studentId} onValueChange={setStudentId}>
              <SelectTrigger
                id="college-coach-student"
                className="h-12 border-[#9aabb3] shadow-none"
                aria-label="Eligible student"
              >
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {eligibleStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name}, {student.ageLabel.toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="appointments" className="mt-10">
          <TabsList className="grid h-auto w-full grid-cols-3 rounded-none border-b border-[#cdd9df] bg-transparent p-0 text-[#5e7079] sm:flex sm:justify-start sm:gap-7">
            <PortalTab value="appointments">Appointments</PortalTab>
            <PortalTab value="essay-reviews">Essay Reviews</PortalTab>
            <PortalTab value="college-list">College List</PortalTab>
          </TabsList>

          <TabsContent value="appointments" className="mt-8">
            <AppointmentsView studentName={selectedStudent?.name ?? "Alex Simpson"} />
          </TabsContent>

          <TabsContent value="essay-reviews" className="mt-8">
            <ServiceView
              icon={FileText}
              title="Essay Reviews"
              description="Get detailed feedback from an admissions expert before you submit an essay."
              cost="1 credit per essay"
              status="No essay reviews yet"
            />
          </TabsContent>

          <TabsContent value="college-list" className="mt-8">
            <ServiceView
              icon={ListChecks}
              title="College List"
              description="Work with an expert to build a balanced, personalized list of colleges."
              cost="1 credit for one list"
              status="College list not started"
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function PortalTab({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) {
  return (
    <TabsTrigger
      value={value}
      className="h-12 min-w-0 rounded-none border-b-[3px] border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-semibold text-[#5e7079] shadow-none data-[state=active]:border-[#176080] data-[state=active]:bg-transparent data-[state=active]:text-[#173f54] data-[state=active]:shadow-none sm:shrink-0 sm:px-0 sm:text-base"
    >
      {children}
    </TabsTrigger>
  )
}

function AppointmentsView({ studentName }: { studentName: string }) {
  return (
    <section aria-labelledby="appointments-heading">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 id="appointments-heading" className="text-2xl font-semibold">
            Appointments
          </h2>
          <p className="mt-1 text-sm text-[#667983]">
            Your upcoming coaching sessions for {studentName}.
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/buc/college-coach/">Book an appointment</Link>
        </Button>
      </div>

      <Card className="mt-6 overflow-hidden border-[#ced9de] shadow-none">
        <CardHeader className="gap-3 border-b border-[#e0e7ea] bg-white p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
          <div>
            <CardTitle className="text-lg text-[#173f54]">
              College Admissions
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-[#667983]">
              45-minute coaching session for {studentName}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="w-fit border-[#9bc8dc] bg-[#eff9fd] text-[#176080]"
          >
            Upcoming
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-5 bg-white p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-center sm:p-6">
          <AppointmentDetail icon={CalendarDays} label="Date">
            September 16, 2026
          </AppointmentDetail>
          <AppointmentDetail icon={Clock3} label="Time">
            9:00 AM EST
          </AppointmentDetail>
          <Button asChild>
            <a href={MOCK_TEAMS_LINK} target="_blank" rel="noopener noreferrer">
              <Video data-icon="inline-start" aria-hidden="true" />
              Join Teams call
            </a>
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}

function AppointmentDetail({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef6f9] text-[#176080]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs font-medium text-[#6a7a82]">{label}</p>
        <p className="mt-0.5 font-medium text-[#2a4654]">{children}</p>
      </div>
    </div>
  )
}

function ServiceView({
  icon: Icon,
  title,
  description,
  cost,
  status,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  title: string
  description: string
  cost: string
  status: string
}) {
  return (
    <section aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}>
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8f3f8] text-[#176080]">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h2
            id={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}
            className="text-2xl font-semibold"
          >
            {title}
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-[#667983]">
            {description}
          </p>
        </div>
      </div>

      <Card className="mt-6 border-[#ced9de] shadow-none">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="font-semibold text-[#2a4654]">{status}</p>
              <p className="mt-1 text-sm text-[#667983]">
                Activity for the selected student will appear here.
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#47616e]">
              <WalletCards className="h-5 w-5 text-[#176080]" aria-hidden="true" />
              <span>{cost}</span>
            </div>
          </div>
          <Separator className="my-5" />
          <p className="text-sm text-[#667983]">23 credits available</p>
        </CardContent>
      </Card>
    </section>
  )
}
