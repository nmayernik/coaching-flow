export interface Student {
  id: number;
  name: string;
  age: string;
}

export interface CoachingFormAccordionProps {
  onStepChange?: (step: number) => void;
  onCompletedStepsChange?: (completedSteps: number[]) => void;
  onCategoryChange?: (category: string) => void;
} 