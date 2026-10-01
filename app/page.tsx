"use client"

import { Suspense } from 'react'
import Component from "../coaching-form"
import { HandoffNavigation } from "@/components/HandoffNavigation"

export default function Page() {
  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <HandoffNavigation />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    </div>
  )
}
