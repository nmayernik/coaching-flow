export type BucAudience = "baby" | "preschool" | "school" | "teen" | "adult" | "senior" | "pets"

export type BucFamilyMember = {
  id: string
  name: string
  ageLabel: string
  menuLabel: string
  audience: BucAudience
  collegeCoachEligible?: boolean
  disabled?: boolean
}

export const BUC_FAMILY_MEMBERS: BucFamilyMember[] = [
  {
    id: "homer",
    name: "Homer Simpson",
    ageLabel: "Age 39",
    menuLabel: "Homer Simpson, 39",
    audience: "adult",
    disabled: true,
  },
  {
    id: "marge",
    name: "Marge Simpson",
    ageLabel: "Age 36",
    menuLabel: "Marge Simpson, 36",
    audience: "adult",
  },
  {
    id: "alex",
    name: "Alex Simpson",
    ageLabel: "Age 17",
    menuLabel: "Alex Simpson, 17",
    audience: "teen",
    collegeCoachEligible: true,
  },
  {
    id: "bart",
    name: "Bart Simpson",
    ageLabel: "Age 10",
    menuLabel: "Bart Simpson, 10",
    audience: "school",
  },
  {
    id: "lisa",
    name: "Lisa Simpson",
    ageLabel: "Age 8",
    menuLabel: "Lisa Simpson, 8",
    audience: "school",
  },
  {
    id: "maggie",
    name: "Maggie Simpson",
    ageLabel: "6 months",
    menuLabel: "Maggie Simpson, 6 mo",
    audience: "baby",
  },
  {
    id: "abe",
    name: "Abe Simpson",
    ageLabel: "Age 83",
    menuLabel: "Abe Simpson, 83",
    audience: "senior",
  },
  {
    id: "mona",
    name: "Mona Simpson",
    ageLabel: "Age 70",
    menuLabel: "Mona Simpson, 70",
    audience: "senior",
  },
  {
    id: "pets",
    name: "Pets",
    ageLabel: "Household pets",
    menuLabel: "Pets",
    audience: "pets",
  },
]
