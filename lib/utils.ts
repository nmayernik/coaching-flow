import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mock data for existing students from other services
export interface ExistingStudent {
  id: string;
  firstName: string;
  lastName: string;
  benefitId: string;
}

export const existingStudentsFromOtherServices: ExistingStudent[] = [
  {
    id: "existing-1",
    firstName: "Emma",
    lastName: "Johnson",
    benefitId: "bc-12345"
  },
  {
    id: "existing-2", 
    firstName: "Michael",
    lastName: "Chen",
    benefitId: "tut-67890"
  },
  {
    id: "existing-3",
    firstName: "Sophia",
    lastName: "Rodriguez", 
    benefitId: "bc-54321"
  }
];
