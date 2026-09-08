import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "College Coach Portal | Bright Horizons",
  description: "College Coach portal placeholder.",
}

export default function CollegeCoachPortalPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_#edf8ff_0,_#f8fcff_42%,_#f7fbfe_82%)] px-5 text-[#173f54]">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">To be designed</h1>
        <Link
          href="/buc/college-coach/"
          className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-[#176080] underline-offset-4 hover:underline"
        >
          <ChevronLeft aria-hidden="true" />
          Back to College Coach
        </Link>
      </div>
    </main>
  )
}
