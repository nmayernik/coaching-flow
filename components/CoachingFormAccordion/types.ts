export interface Student {
  id: number;
  name: string;
  age: string;
  sessionsAvailable?: number;
}

export interface Coach {
  id: string;
  name: string;
  specializations?: string[];
}

export interface PreviousCoachSession {
  coachId: string;
  coachName: string;
  topic: string;
  lastMeetingDate: string; // ISO date string
}

export interface CoachingFormAccordionProps {
  onStepChange?: (step: number) => void;
  onCompletedStepsChange?: (completedSteps: number[]) => void;
  onCategoryChange?: (category: string) => void;
} 