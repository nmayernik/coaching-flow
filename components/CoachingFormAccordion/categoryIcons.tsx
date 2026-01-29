import * as React from "react";
import { BookOpen, Briefcase, PiggyBank, MessageCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Bank, GraduationHat01 } from "@untitledui/icons";

type CategoryIcon = LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;

// Category icons and colors (success = BHDS green/olive, green = emerald)
export const categoryIcons: { [key: string]: { icon: CategoryIcon; bgColor: string; iconColor: string } } = {
  "Intro to College Coach": { icon: MessageCircle, bgColor: "bg-teal-100", iconColor: "text-teal-700" },
  "Education Planning": { icon: BookOpen, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
  "College Admissions": { icon: GraduationHat01, bgColor: "bg-success-100", iconColor: "text-success-600" },
  "College Finance": { icon: Bank, bgColor: "bg-yellow-100", iconColor: "text-yellow-600" },
  "Career Planning": { icon: Briefcase, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
  "Personal Finance": { icon: PiggyBank, bgColor: "bg-magenta-100", iconColor: "text-magenta-700" }
}; 