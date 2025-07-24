import { BookOpen, Building, DollarSign, Briefcase, PiggyBank, MessageCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Category icons and colors
export const categoryIcons: { [key: string]: { icon: LucideIcon, bgColor: string, iconColor: string } } = {
  "Intro to College Coach": { icon: MessageCircle, bgColor: "bg-indigo-100", iconColor: "text-indigo-600" },
  "Education Planning": { icon: BookOpen, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
  "College Admissions": { icon: Building, bgColor: "bg-green-100", iconColor: "text-green-600" },
  "College Finance": { icon: DollarSign, bgColor: "bg-yellow-100", iconColor: "text-yellow-600" },
  "Career Planning": { icon: Briefcase, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
  "Personal Finance": { icon: PiggyBank, bgColor: "bg-pink-100", iconColor: "text-pink-600" }
}; 