// Big C Coaching (onebh) topic and subtopic data – used when currentScenario === "big-c-coaching"

export const ONE_BH_TOPICS = [
  "Education for Working Learners",
  "Career / Non-Degree",
  "Skills + Learning",
  "Financial",
  "Executive",
] as const;

export type OneBhTopic = (typeof ONE_BH_TOPICS)[number];

export const ONE_BH_SUBTOPICS: Record<string, string[]> = {
  "Education for Working Learners": [
    "Degree planning and timelines",
    "Balancing work and school",
    "Credit transfer and prior learning",
  ],
  "Career / Non-Degree": [
    "Career exploration",
    "Certifications and non-degree paths",
    "Job search and networking",
  ],
  "Skills + Learning": [
    "Skill assessments",
    "Learning pathways",
    "Upskilling and reskilling",
  ],
  Financial: [
    "Tuition and aid options",
    "Budgeting for education",
    "Loan repayment strategies",
  ],
  Executive: [
    "Leadership development",
    "Executive education options",
    "Career transition at senior level",
  ],
};

export function getSubtopicsForOneBhTopic(topic: string): string[] {
  return ONE_BH_SUBTOPICS[topic] ?? [];
}
