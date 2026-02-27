import { Scenario, ScenarioCatalogKey, ScenarioDefinition } from "@/lib/scenarios/types"

const defaultScenarios: ScenarioDefinition[] = [
  {
    id: "default",
    name: "Default",
    description: "Normal flow with all features available",
    url: "/",
  },
  {
    id: "with-existing-students",
    name: "With Existing Students",
    description: "Students from other services are available to add",
    url: "/?scenario=with-existing-students",
  },
  {
    id: "no-appointments",
    name: "No Appointments",
    description: "All students have 0/3 sessions available",
    url: "/?scenario=no-appointments",
  },
  {
    id: "no-topics-available",
    name: "No Topics Available",
    description: "No topics available for selected student",
    url: "/?scenario=no-topics-available",
  },
  {
    id: "no-dates-available",
    name: "No Dates Available",
    description: "No dates/times available for selected topic",
    url: "/?scenario=no-dates-available",
  },
  {
    id: "hide-intro-after-call",
    name: "Hide Intro (student has had calls)",
    description: "Intro to College Coach hidden for students with >0 prior calls",
    url: "/?scenario=hide-intro-after-call",
  },
]

const oneBhScenarios: ScenarioDefinition[] = [
  {
    id: "default",
    name: "Default",
    description: "Default OneBH integrated experience",
    url: "/onebh",
  },
  {
    id: "big-c-coaching",
    name: "Big C Coaching",
    description: "Focus question then dependent/topic selection",
    url: "/onebh?scenario=big-c-coaching",
  },
]

export function getScenarioCatalog(catalogKey: ScenarioCatalogKey): ScenarioDefinition[] {
  switch (catalogKey) {
    case "onebh":
      return oneBhScenarios
    case "default":
    default:
      return defaultScenarios
  }
}

export function isValidScenario(scenarios: ScenarioDefinition[], scenario: string | null): scenario is Scenario {
  if (!scenario) {
    return false
  }

  return scenarios.some(({ id }) => id === scenario)
}

