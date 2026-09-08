import type { Metadata } from "next"

import { CollegeCoachBenefit } from "@/components/buc/CollegeCoachBenefit"

export const metadata: Metadata = {
  title: "College Coach Benefit | Bright Horizons",
  description: "College planning guidance for high school students ages 14-18.",
}

export default function CollegeCoachBenefitPage() {
  return <CollegeCoachBenefit />
}
