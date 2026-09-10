import type { Metadata } from "next"

import { CollegeCoachPortal } from "@/components/buc/CollegeCoachPortal"

export const metadata: Metadata = {
  title: "College Coach Portal | Bright Horizons",
  description: "Manage College Coach appointments and services.",
}

export default function CollegeCoachPortalPage() {
  return <CollegeCoachPortal />
}
