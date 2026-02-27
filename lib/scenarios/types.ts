export type Scenario =
  | "default"
  | "big-c-coaching"
  | "no-appointments"
  | "no-topics-available"
  | "with-existing-students"
  | "no-dates-available"
  | "hide-intro-after-call"

export type ScenarioCatalogKey = "default" | "onebh"

export interface ScenarioDefinition {
  id: Scenario
  name: string
  description: string
  url: string
}

