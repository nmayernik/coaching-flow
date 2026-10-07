"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import {
  createStudySession,
  getNamingVariant,
  isNamingVariantId,
  parseStudySession,
  STUDY_STORAGE_KEY,
  type NamingStudySession,
  type StudyBooking,
} from "@/lib/teamsNamingStudy"

interface TeamsNamingStudyContextValue {
  session: NamingStudySession
  serviceName: string
  saveBooking: (booking: StudyBooking) => void
}

const TeamsNamingStudyContext = React.createContext<TeamsNamingStudyContextValue | null>(null)

function persistSession(session: NamingStudySession) {
  try {
    window.localStorage.setItem(STUDY_STORAGE_KEY, JSON.stringify(session))
  } catch {
    // The booking remains usable if a browser blocks persistent storage.
  }
}

export function TeamsNamingStudyProvider({ children }: { children: React.ReactNode }) {
  const params = useSearchParams()
  const fixedVariant = params.get("variant")?.toUpperCase()
  const [session, setSession] = React.useState<NamingStudySession | null>(null)

  React.useEffect(() => {
    let existing: NamingStudySession | null = null
    try {
      existing = parseStudySession(window.localStorage.getItem(STUDY_STORAGE_KEY))
    } catch {
      // Fall back to a fresh session without blocking the study.
    }
    const fixed = isNamingVariantId(fixedVariant) ? fixedVariant : undefined
    const next = existing ?? createStudySession(fixed)
    if (fixed) next.assignedVariant = fixed
    persistSession(next)
    setSession(next)
  }, [fixedVariant])

  const saveBooking = React.useCallback((booking: StudyBooking) => {
    setSession((current) => {
      if (!current) return current
      const next = { ...current, booking }
      persistSession(next)
      return next
    })
  }, [])

  if (!session) {
    return (
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-12" aria-busy="true" aria-label="Loading booking">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-80 w-full" />
      </div>
    )
  }

  return (
    <TeamsNamingStudyContext.Provider value={{ session, serviceName: getNamingVariant(session.assignedVariant).name, saveBooking }}>
      {children}
    </TeamsNamingStudyContext.Provider>
  )
}

export function useTeamsNamingStudy() {
  return React.useContext(TeamsNamingStudyContext)
}
