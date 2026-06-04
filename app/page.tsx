"use client"

import { Suspense } from 'react'
import Link from 'next/link'
import Component from "../coaching-form"
import { HandoffNavigation } from "@/components/HandoffNavigation"

export default function Page() {
  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="https://benefit-overview.vercel.app?source=coaching-flow-nav"
          className="inline-flex items-center rounded-lg border border-blue-100 bg-white/90 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm transition-colors hover:bg-blue-50"
        >
          View benefit overview
        </Link>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <HandoffNavigation />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    </div>
  )
}
