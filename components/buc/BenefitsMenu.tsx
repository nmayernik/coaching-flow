"use client"

import Image from "next/image"
import Link from "next/link"
import {
  BookOpen,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Grid2X2,
  HeartHandshake,
  Home,
  PawPrint,
  School,
  ShieldCheck,
  TentTree,
  UsersRound,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import { useMemo, useState } from "react"

type Audience = "baby" | "preschool" | "school" | "teen" | "adult" | "senior" | "pets"

type Benefit = {
  title: string
  description: string
  audiences: Audience[]
  icon: LucideIcon
  iconClassName: string
  href?: string
  image?: string
}

const benefits: Benefit[] = [
  {
    title: "In-Home Care",
    description: "One credit is equal to one day of care for up to 10 hours for up to 3 care recipients.",
    audiences: ["baby", "preschool", "school", "teen", "adult", "senior"],
    icon: Home,
    iconClassName: "bg-sky-100 text-sky-800",
  },
  {
    title: "Center Care",
    description: "One credit is equal to one day of care per care recipient.",
    audiences: ["baby", "preschool", "school"],
    icon: School,
    iconClassName: "bg-emerald-100 text-emerald-800",
  },
  {
    title: "Tutoring",
    description: "One credit is equal to 3 hours of in-person tutoring.",
    audiences: ["school", "teen"],
    icon: BookOpen,
    iconClassName: "bg-amber-100 text-amber-800",
  },
  {
    title: "College Coach",
    description: "Personal college guidance for high school students ages 14-18.",
    audiences: ["teen"],
    icon: GraduationCap,
    iconClassName: "bg-yellow-100 text-yellow-800",
    href: "/buc/college-coach/",
    image: "/buc/college-coach-hero.png",
  },
  {
    title: "Camps",
    description: "One credit is equal to one day of care for unlimited care recipients.",
    audiences: ["school", "teen"],
    icon: TentTree,
    iconClassName: "bg-lime-100 text-lime-800",
  },
  {
    title: "Pet Care",
    description: "One coupon for pet care deducts 1 credit from your back-up care bank.",
    audiences: ["pets"],
    icon: PawPrint,
    iconClassName: "bg-orange-100 text-orange-800",
  },
  {
    title: "Out of Network Care",
    description: "One credit is equal to one day of care for up to 10 hours for up to 3 care recipients.",
    audiences: ["baby", "preschool", "school", "teen", "adult", "senior"],
    icon: HeartHandshake,
    iconClassName: "bg-rose-100 text-rose-800",
  },
  {
    title: "Crisis Care",
    description: "One hour is equal to one hour of care for unlimited care recipients with a 4 hour minimum.",
    audiences: ["baby", "preschool", "school", "teen", "adult", "senior"],
    icon: ShieldCheck,
    iconClassName: "bg-cyan-100 text-cyan-800",
  },
  {
    title: "Return to Work",
    description: "One credit is equal to one credit of care per care recipient.",
    audiences: ["adult"],
    icon: BriefcaseBusiness,
    iconClassName: "bg-violet-100 text-violet-800",
  },
]

const familyMembers: Array<{ id: string; label: string; audience: Audience; disabled?: boolean }> = [
  { id: "homer", label: "Homer Simpson, 39", audience: "adult", disabled: true },
  { id: "marge", label: "Marge Simpson, 36", audience: "adult" },
  { id: "bart", label: "Bart Simpson, 10", audience: "school" },
  { id: "lisa", label: "Lisa Simpson, 8", audience: "school" },
  { id: "maggie", label: "Maggie Simpson, 6 mo", audience: "baby" },
  { id: "abe", label: "Abe Simpson, 83", audience: "senior" },
  { id: "mona", label: "Mona Simpson, 70", audience: "senior" },
  { id: "pets", label: "Pets", audience: "pets" },
]

const ageGroups: Array<{ label: string; value: Audience }> = [
  { label: "Baby (0-2)", value: "baby" },
  { label: "Preschool (3-5)", value: "preschool" },
  { label: "School-Age (6-13)", value: "school" },
  { label: "High School (14-18)", value: "teen" },
  { label: "Adult (19-64)", value: "adult" },
  { label: "Senior (65+)", value: "senior" },
]

export function BenefitsMenu() {
  const [mode, setMode] = useState<"person" | "all">("all")
  const [audience, setAudience] = useState<Audience | "">("")
  const [selectedPerson, setSelectedPerson] = useState("")
  const [selectedAge, setSelectedAge] = useState("")

  const visibleBenefits = useMemo(() => {
    if (mode === "all" || !audience) return benefits
    return benefits.filter((benefit) => benefit.audiences.includes(audience))
  }, [audience, mode])

  const handleModeChange = (nextMode: string) => {
    if (nextMode === "person" || nextMode === "all") {
      setMode(nextMode)
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#edf8ff_0,_#f8fcff_40%,_#ffffff_78%)] text-[#2f3033]">
      <div className="mx-auto w-full max-w-[1232px] px-5 pb-16 pt-8 sm:px-8 lg:px-10 lg:pb-24 lg:pt-12">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/buc/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0577b9] transition-colors hover:text-[#035f94]"
          >
            <ChevronLeft aria-hidden="true" />
            Back to explore
          </Link>
          <Image
            src="/BHLogo@2x.png"
            alt="Bright Horizons"
            width={160}
            height={27}
            priority
          />
        </div>

        <section aria-labelledby="benefit-view-heading">
          <h1 id="benefit-view-heading" className="sr-only">Explore your benefits</h1>
          <ToggleGroup
            type="single"
            value={mode}
            onValueChange={handleModeChange}
            className="grid items-stretch gap-5 md:grid-cols-2"
            aria-label="Choose how to explore benefits"
          >
            <ToggleGroupItem
              value="person"
              className="h-auto min-h-[152px] w-full justify-start rounded-lg border border-[#9f9f9f] bg-white p-5 text-left shadow-none transition-[border-color,box-shadow,background-color] hover:bg-white data-[state=on]:border-[#176080] data-[state=on]:bg-[#f8fcff] data-[state=on]:shadow-[inset_0_0_0_1px_#176080] sm:p-6"
            >
              <span className="flex min-w-0 flex-col items-start gap-4">
                <span className="flex size-12 items-center justify-center rounded-full bg-[#dff3fb] text-[#176080]">
                  <UsersRound aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="text-lg font-semibold text-[#323336]">Start with a person</span>
                  <span className="whitespace-normal text-base font-normal leading-6 text-[#48494c]">
                    Pick a family member or age group to see what&apos;s available for them
                  </span>
                </span>
              </span>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="all"
              className="h-auto min-h-[152px] w-full justify-start rounded-lg border border-[#9f9f9f] bg-white p-5 text-left shadow-none transition-[border-color,box-shadow,background-color] hover:bg-white data-[state=on]:border-[#176080] data-[state=on]:bg-[#f8fcff] data-[state=on]:shadow-[inset_0_0_0_1px_#176080] sm:p-6"
            >
              <span className="flex min-w-0 flex-col items-start gap-4">
                <span className="flex size-12 items-center justify-center rounded-full bg-[#dff3fb] text-[#176080]">
                  <Grid2X2 aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="text-lg font-semibold text-[#323336]">See all Back-Up Benefits</span>
                  <span className="whitespace-normal text-base font-normal leading-6 text-[#48494c]">
                    View a complete overview of every benefit available to you
                  </span>
                </span>
              </span>
            </ToggleGroupItem>
          </ToggleGroup>
        </section>

        {mode === "person" && (
          <section className="mt-12" aria-labelledby="person-filter-heading">
            <h2 id="person-filter-heading" className="mb-4 text-base font-normal text-[#626876]">Select a family member</h2>
            <ToggleGroup
              type="single"
              value={selectedPerson}
              onValueChange={(value) => {
                const member = familyMembers.find((item) => item.id === value)
                if (!member) return
                setSelectedPerson(member.id)
                setSelectedAge("")
                setAudience(member.audience)
              }}
              className="flex flex-wrap justify-start gap-3"
              aria-label="Select a family member"
            >
              {familyMembers.map((member) => (
                <ToggleGroupItem
                  key={member.id}
                  value={member.id}
                  disabled={member.disabled}
                  variant="outline"
                  className="h-11 rounded-lg border-[#9f9f9f] bg-white px-5 text-base text-[#176080] hover:bg-[#f3faff] data-[state=on]:border-[#176080] data-[state=on]:bg-[#e8f6fc] data-[state=on]:text-[#124c67]"
                >
                  {member.label}
                  {member.disabled && <span className="text-xs font-normal text-[#89909e]">Not eligible</span>}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <h2 className="mb-4 mt-5 text-base font-normal text-[#626876]">Or explore by age</h2>
            <ToggleGroup
              type="single"
              value={selectedAge}
              onValueChange={(value) => {
                if (!value) return
                setSelectedAge(value)
                setSelectedPerson("")
                setAudience(value as Audience)
              }}
              className="flex flex-wrap justify-start gap-3"
              aria-label="Select an age group"
            >
              {ageGroups.map((group) => (
                <ToggleGroupItem
                  key={group.value}
                  value={group.value}
                  variant="outline"
                  className="h-11 rounded-lg border-[#9f9f9f] bg-white px-5 text-base text-[#176080] hover:bg-[#f3faff] data-[state=on]:border-[#176080] data-[state=on]:bg-[#e8f6fc] data-[state=on]:text-[#124c67]"
                >
                  {group.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </section>
        )}

        {(mode === "all" || audience) && (
          <section className="mt-12" aria-labelledby="benefits-heading">
            <h2 id="benefits-heading" className="text-3xl font-semibold text-[#173f54]">
              {mode === "all" ? "All your benefits" : "Benefits for this person"}
            </h2>
            <p className="mt-3 text-lg text-[#6a7180]">See what your credits get you</p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {visibleBenefits.map((benefit) => (
                <BenefitCard key={benefit.title} benefit={benefit} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

function BenefitCard({ benefit }: { benefit: Benefit }) {
  const Icon = benefit.icon
  const content = (
    <Card
      className={cn(
        "h-full min-h-[132px] border-[#d5d5d5] bg-white shadow-none transition-[border-color,box-shadow,transform]",
        benefit.href && "hover:-translate-y-0.5 hover:border-[#7eaec4] hover:shadow-md"
      )}
    >
      <CardHeader className="flex-row items-center gap-4 p-5 pb-2">
        {benefit.image ? (
          <span className="relative size-16 shrink-0 overflow-hidden rounded-full bg-[#eef7fb]">
            <Image src={benefit.image} alt="" fill sizes="64px" className="object-cover" />
          </span>
        ) : (
          <span className={cn("flex size-16 shrink-0 items-center justify-center rounded-full", benefit.iconClassName)}>
            <Icon aria-hidden="true" />
          </span>
        )}
        <CardTitle className="min-w-0 text-xl font-semibold leading-7 text-[#176080]">{benefit.title}</CardTitle>
        {benefit.href && <ChevronRight className="ml-auto shrink-0 text-[#176080]" aria-hidden="true" />}
      </CardHeader>
      <CardContent className="pb-5 pl-[100px] pr-6 pt-0">
        <p className="text-base leading-6 text-[#48494c]">{benefit.description}</p>
      </CardContent>
    </Card>
  )

  if (!benefit.href) return <article>{content}</article>

  return (
    <Link href={benefit.href} className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176080] focus-visible:ring-offset-2">
      {content}
    </Link>
  )
}
