import type { Student } from "@/components/CoachingFormAccordion/types"

export const NAMING_VARIANTS = [
  { id: "A", name: "Web counseling" },
  { id: "B", name: "Virtual counseling" },
  { id: "C", name: "Live virtual counseling" },
  { id: "D", name: "Digital counseling" },
  { id: "E", name: "Online counseling" },
  { id: "F", name: "Live online counseling" },
] as const

export type NamingVariantId = (typeof NAMING_VARIANTS)[number]["id"]
export const STUDY_STORAGE_KEY = "college-coach-teams-naming-2026-10-v1"

export const STUDY_STUDENTS: Student[] = [
  { id: 1, name: "Alex", age: "11th grade", sessionsAvailable: 3 },
  { id: 2, name: "Jamie", age: "12th grade", sessionsAvailable: 3 },
]

export interface StudyBooking {
  selectedStudent: Student
  category: string
  topic: string
  date: string
  time: string
  phone: string
}

export interface NamingStudySession {
  version: 1
  assignedVariant: NamingVariantId
  comparisonOrder: NamingVariantId[]
  createdAt: number
  booking?: StudyBooking
}

export function isNamingVariantId(value: unknown): value is NamingVariantId {
  return NAMING_VARIANTS.some((variant) => variant.id === value)
}

export function getNamingVariant(id: NamingVariantId) {
  return NAMING_VARIANTS.find((variant) => variant.id === id)!
}

export function getBookingHeading(id: NamingVariantId) {
  return `Book ${getNamingVariant(id).name.toLowerCase()}`
}

export function createStudySession(fixedVariant?: NamingVariantId): NamingStudySession {
  const comparisonOrder = NAMING_VARIANTS.map((variant) => variant.id)
  for (let i = comparisonOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[comparisonOrder[i], comparisonOrder[j]] = [comparisonOrder[j], comparisonOrder[i]]
  }
  // Assignment is independent of the shuffled comparison order.
  const assignedVariant = fixedVariant ?? NAMING_VARIANTS[Math.floor(Math.random() * NAMING_VARIANTS.length)].id
  return { version: 1, assignedVariant, comparisonOrder, createdAt: Date.now() }
}

export function isStudyBooking(value: unknown): value is StudyBooking {
  if (!value || typeof value !== "object") return false
  const booking = value as StudyBooking
  return Boolean(
    booking.selectedStudent &&
    typeof booking.selectedStudent.id === "number" &&
    typeof booking.selectedStudent.name === "string" &&
    typeof booking.selectedStudent.age === "string" &&
    [booking.category, booking.topic, booking.date, booking.time, booking.phone].every((field) => typeof field === "string") &&
    /^\d{4}-\d{2}-\d{2}$/.test(booking.date)
  )
}

export function parseStudySession(raw: string | null): NamingStudySession | null {
  if (!raw) return null
  try {
    const session = JSON.parse(raw) as NamingStudySession
    if (
      session?.version !== 1 ||
      !isNamingVariantId(session.assignedVariant) ||
      !Array.isArray(session.comparisonOrder) ||
      session.comparisonOrder.length !== NAMING_VARIANTS.length ||
      new Set(session.comparisonOrder).size !== NAMING_VARIANTS.length ||
      !session.comparisonOrder.every(isNamingVariantId) ||
      typeof session.createdAt !== "number" ||
      !Number.isFinite(session.createdAt) ||
      session.createdAt > Date.now() + 60_000 ||
      Date.now() - session.createdAt > 3 * 24 * 60 * 60 * 1000
    ) return null
    if (session.booking !== undefined && !isStudyBooking(session.booking)) return null
    return session
  } catch {
    return null
  }
}

export function getExampleBooking(): StudyBooking {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  while (date.getDay() === 0 || date.getDay() === 6) date.setDate(date.getDate() + 1)
  const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  return {
    selectedStudent: STUDY_STUDENTS[0],
    category: "College Admissions",
    topic: "Selecting Best Fit Colleges",
    date: dateString,
    time: "10:00",
    phone: "(202) 555-0147",
  }
}
