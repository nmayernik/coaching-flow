"use client"

export type CoachRoleVariant = "coach" | "counselor" | "expert" | "educator" | "advisor"

export interface CoachRoleLabels {
  variant: CoachRoleVariant
  singular: string
  plural: string
  titleSingular: string
  titlePlural: string
  previous: string
  all: string
  any: string
}

export const COACH_ROLE_VARIANTS: CoachRoleVariant[] = [
  "coach",
  "counselor",
  "expert",
  "educator",
  "advisor",
]

const ROLE_LABELS: Record<CoachRoleVariant, Omit<CoachRoleLabels, "variant" | "previous" | "all" | "any">> = {
  coach: {
    singular: "coach",
    plural: "coaches",
    titleSingular: "Coach",
    titlePlural: "Coaches",
  },
  counselor: {
    singular: "counselor",
    plural: "counselors",
    titleSingular: "Counselor",
    titlePlural: "Counselors",
  },
  expert: {
    singular: "expert",
    plural: "experts",
    titleSingular: "Expert",
    titlePlural: "Experts",
  },
  educator: {
    singular: "educator",
    plural: "educators",
    titleSingular: "Educator",
    titlePlural: "Educators",
  },
  advisor: {
    singular: "advisor",
    plural: "advisors",
    titleSingular: "Advisor",
    titlePlural: "Advisors",
  },
}

export function isCoachRoleVariant(value: string | null): value is CoachRoleVariant {
  return COACH_ROLE_VARIANTS.includes(value as CoachRoleVariant)
}

export function getCoachRoleLabels(variant: CoachRoleVariant = "coach"): CoachRoleLabels {
  const labels = ROLE_LABELS[variant]

  return {
    variant,
    ...labels,
    previous: `previous ${labels.singular}`,
    all: `all ${labels.plural}`,
    any: `any ${labels.singular}`,
  }
}
