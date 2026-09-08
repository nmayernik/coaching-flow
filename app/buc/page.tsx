import type { Metadata } from "next"

import { BenefitsMenu } from "@/components/buc/BenefitsMenu"

export const metadata: Metadata = {
  title: "Back-Up Care Benefits | Bright Horizons",
  description: "Explore the Bright Horizons benefits available to your family.",
}

export default function BenefitsMenuPage() {
  return <BenefitsMenu />
}
