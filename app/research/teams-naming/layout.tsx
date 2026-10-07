import { Suspense } from "react"
import type { Metadata } from "next"
import { TeamsNamingStudyProvider } from "@/contexts/TeamsNamingStudyContext"

export const metadata: Metadata = {
  title: "College Coach · Booking study",
  robots: { index: false, follow: false },
}

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<p className="p-8">Loading booking…</p>}><TeamsNamingStudyProvider>{children}</TeamsNamingStudyProvider></Suspense>
}
