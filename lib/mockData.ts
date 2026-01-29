import { Scenario } from "@/components/ScenarioSwitcher"
import { Coach, PreviousCoachSession } from "@/components/CoachingFormAccordion/types"
import { getAvailableTopics } from "@/lib/topicLogicData"

// Mock coaches data
export const mockCoaches: Coach[] = [
  {
    id: "coach-1",
    name: "Becky",
    specializations: ["Preparing College Applications", "College Admissions"]
  },
  {
    id: "coach-2",
    name: "Sarah",
    specializations: ["Financial Aid", "Scholarships"]
  },
  {
    id: "coach-3",
    name: "Michael",
    specializations: ["Career Planning", "Major Selection"]
  },
  {
    id: "coach-4",
    name: "Jennifer",
    specializations: ["Essay Writing", "Preparing College Applications"]
  }
]

// Mock previous coach sessions - maps studentId + topic to previous coach session
// Format: "studentId-topic" -> PreviousCoachSession
const mockPreviousCoachSessions: Record<string, PreviousCoachSession> = {
  "1-Preparing College Applications": {
    coachId: "coach-1",
    coachName: "Becky",
    topic: "Preparing College Applications",
    lastMeetingDate: "2025-09-01"
  },
  "1-Introduction to Your College Coach": {
    coachId: "coach-1",
    coachName: "Becky",
    topic: "Introduction to Your College Coach",
    lastMeetingDate: "2025-08-15"
  },
  // Add entries for common topics to make testing easier
  "1-Topic 1": {
    coachId: "coach-1",
    coachName: "Becky",
    topic: "Topic 1",
    lastMeetingDate: "2025-09-15"
  },
  "1-Topic 2": {
    coachId: "coach-1",
    coachName: "Becky",
    topic: "Topic 2",
    lastMeetingDate: "2025-09-15"
  },
  "1-Topic 3": {
    coachId: "coach-1",
    coachName: "Becky",
    topic: "Topic 3",
    lastMeetingDate: "2025-09-15"
  }
}

// Mock students data
export const mockStudents = [
  {
    id: 1,
    name: "Nick",
    age: "12th grade",
    sessionsAvailable: 3
  },
  {
    id: 2,
    name: "Christopher", 
    age: "8th grade",
    sessionsAvailable: 3
  },
  {
    id: 3,
    name: "Sarah",
    age: "5th grade", 
    sessionsAvailable: 3
  }
]

// Mock existing students from other services
export const mockExistingStudents = [
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
]

// Scenario-aware data getters
export function getStudentsForScenario(scenario: Scenario) {
  switch (scenario) {
    case "no-appointments":
      return mockStudents.map(student => ({
        ...student,
        sessionsAvailable: 0
      }));
    case "no-topics-available":
      return [
        {
          id: 4,
          name: "Baby",
          age: "Newborn",
          sessionsAvailable: 3
        }
      ];
    default:
      return mockStudents;
  }
}

export function getExistingStudentsForScenario(scenario: Scenario) {
  switch (scenario) {
    case "with-existing-students":
      return mockExistingStudents;
    default:
      // Default scenario has no existing students
      return [];
  }
}

export function getTopicsForScenario(scenario: Scenario, category: string, studentAge: string) {
  switch (scenario) {
    case "no-topics-available":
      return [];
    default:
      // Use the real topic logic for the prototype
      return getAvailableTopics(category, studentAge);
  }
}

export function areDatesAvailableForScenario(scenario: Scenario, topic: string) {
  switch (scenario) {
    case "no-dates-available":
      return false;
    default:
      return true;
  }
}

// Get previous coach for a student and topic combination
export function getPreviousCoachForTopic(studentId: number, topic: string): PreviousCoachSession | null {
  const key = `${studentId}-${topic}`;
  const exactMatch = mockPreviousCoachSessions[key];
  if (exactMatch) {
    return exactMatch;
  }
  
  // For prototype/testing: If no exact match, return a default previous coach for any student/topic
  // This ensures the banner always appears for testing purposes
  if (studentId && topic) {
    return {
      coachId: "coach-1",
      coachName: "Becky",
      topic: topic,
      lastMeetingDate: "2025-09-01"
    };
  }
  
  return null;
}

// Get available dates for a specific coach (more limited than all coaches)
export function getCoachAvailableDates(coachId: string | null): Date[] {
  if (!coachId) {
    // All coaches - return more dates (next 30 weekdays)
    return generateAvailableDates(30);
  }
  
  // Specific coach - return fewer dates (next 15 weekdays, more sparse)
  const allDates = generateAvailableDates(45);
  // Filter to every 3rd weekday to simulate limited availability
  return allDates.filter((_, index) => index % 3 === 0).slice(0, 15);
}

// Get available times for a specific coach on a given date (more limited than all coaches)
export function getCoachAvailableTimesForDate(coachId: string | null, date: Date): string[] {
  const allTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];
  
  if (!coachId) {
    // All coaches - return most times (simulate some being unavailable)
    const dayOfMonth = date.getDate();
    const unavailableCount = dayOfMonth % 3; // 0, 1, or 2 unavailable slots
    return allTimes.slice(0, allTimes.length - unavailableCount);
  }
  
  // Specific coach - return fewer times (only 2-3 slots per day)
  const dayOfMonth = date.getDate();
  const baseIndex = dayOfMonth % 3;
  // Return 2-3 time slots starting from different positions
  const startIndex = baseIndex * 2;
  return allTimes.slice(startIndex, startIndex + 3).filter(Boolean);
}

// Helper: generate available dates starting from tomorrow (no same-day booking)
function generateAvailableDates(count: number): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 1; i <= count * 2; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Skip weekends (Saturday = 6, Sunday = 0)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date);
      if (dates.length >= count) break;
    }
  }

  return dates;
} 