import * as React from "react";
import { BookOpen, Briefcase, PiggyBank, MessageCircle, GraduationCap, TrendingUp, Building2 } from "lucide-react";
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
  "Personal Finance": { icon: PiggyBank, bgColor: "bg-magenta-100", iconColor: "text-magenta-700" },
  // Big C Coaching (onebh) topics
  "Education for Working Learners": { icon: GraduationCap, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
  "Career / Non-Degree": { icon: Briefcase, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
  "Skills + Learning": { icon: TrendingUp, bgColor: "bg-teal-100", iconColor: "text-teal-700" },
  "Financial": { icon: Bank, bgColor: "bg-yellow-100", iconColor: "text-yellow-600" },
  "Executive": { icon: Building2, bgColor: "bg-gray-100", iconColor: "text-gray-700" },
}; 