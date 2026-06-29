"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getScenarioCatalog, isValidScenario } from "@/lib/scenarios/catalogs"
import { Scenario, ScenarioCatalogKey, ScenarioDefinition } from "@/lib/scenarios/types"
import { CoachRoleLabels, CoachRoleVariant, getCoachRoleLabels, isCoachRoleVariant } from "@/lib/coachRoleLabels"

interface ScenarioContextType {
  scenarios: ScenarioDefinition[]
  currentScenario: Scenario
  setScenario: (scenario: Scenario) => void
  scenarioCatalogKey: ScenarioCatalogKey
  isScenarioSwitcherOpen: boolean
  toggleScenarioSwitcher: () => void
  coachContinuityEnabled: boolean
  setCoachContinuityEnabled: (enabled: boolean) => void
  coachRoleVariant: CoachRoleVariant
  coachRoleLabels: CoachRoleLabels
  setCoachRoleVariant: (variant: CoachRoleVariant) => void
  teamsCallsEnabled: boolean
  setTeamsCallsEnabled: (enabled: boolean) => void
}

const ScenarioContext = React.createContext<ScenarioContextType | undefined>(undefined)

interface ScenarioProviderProps {
  children: React.ReactNode
  scenarioCatalogKey?: ScenarioCatalogKey
}

export function ScenarioProvider({ children, scenarioCatalogKey = "default" }: ScenarioProviderProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const scenarios = React.useMemo(() => getScenarioCatalog(scenarioCatalogKey), [scenarioCatalogKey])
  
  // Get initial scenario from URL or default to "default"
  const getInitialScenario = (): Scenario => {
    const scenarioParam = searchParams.get('scenario')
    if (isValidScenario(scenarios, scenarioParam)) {
      return scenarioParam
    }
    return "default"
  }

  const getInitialCoachContinuity = (): boolean => {
    const continuityParam = searchParams.get("coachContinuity") ?? searchParams.get("continuity")
    return ["true", "1", "on", "yes"].includes(continuityParam?.toLowerCase() ?? "")
  }

  const getInitialCoachRoleVariant = (): CoachRoleVariant => {
    const roleParam = searchParams.get("roleTitle") ?? searchParams.get("role")
    return isCoachRoleVariant(roleParam) ? roleParam : "coach"
  }

  const [currentScenario, setCurrentScenario] = React.useState<Scenario>(getInitialScenario)
  const [isScenarioSwitcherOpen, setIsScenarioSwitcherOpen] = React.useState(false)
  const [coachContinuityEnabled, setCoachContinuityEnabledState] = React.useState(getInitialCoachContinuity)
  const [coachRoleVariant, setCoachRoleVariantState] = React.useState<CoachRoleVariant>(getInitialCoachRoleVariant)
  const [teamsCallsEnabled, setTeamsCallsEnabled] = React.useState(false)
  const coachRoleLabels = React.useMemo(() => getCoachRoleLabels(coachRoleVariant), [coachRoleVariant])

  // Update URL when scenario changes
  const setScenario = (scenario: Scenario) => {
    setCurrentScenario(scenario)
    
    // Update URL without page reload
    const params = new URLSearchParams(searchParams.toString())
    if (scenario === "default") {
      params.delete('scenario')
    } else {
      params.set('scenario', scenario)
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
    router.replace(newUrl, { scroll: false })
  }

  const setCoachContinuityEnabled = (enabled: boolean) => {
    setCoachContinuityEnabledState(enabled)

    const params = new URLSearchParams(searchParams.toString())
    if (enabled) {
      params.set("coachContinuity", "true")
    } else {
      params.delete("coachContinuity")
      params.delete("continuity")
    }

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
    router.replace(newUrl, { scroll: false })
  }

  const setCoachRoleVariant = (variant: CoachRoleVariant) => {
    setCoachRoleVariantState(variant)

    const params = new URLSearchParams(searchParams.toString())
    if (variant === "coach") {
      params.delete("roleTitle")
      params.delete("role")
    } else {
      params.set("roleTitle", variant)
      params.delete("role")
    }

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
    router.replace(newUrl, { scroll: false })
  }

  // Sync with URL changes (e.g., browser back/forward)
  React.useEffect(() => {
    const scenarioParam = searchParams.get('scenario')
    if (isValidScenario(scenarios, scenarioParam)) {
      const newScenario = scenarioParam
      if (newScenario !== currentScenario) {
        setCurrentScenario(newScenario)
      }
    } else if (currentScenario !== "default") {
      setCurrentScenario("default")
    }

    const continuityEnabled = getInitialCoachContinuity()
    if (continuityEnabled !== coachContinuityEnabled) {
      setCoachContinuityEnabledState(continuityEnabled)
    }

    const nextRoleVariant = getInitialCoachRoleVariant()
    if (nextRoleVariant !== coachRoleVariant) {
      setCoachRoleVariantState(nextRoleVariant)
    }
  }, [searchParams, currentScenario, scenarios, coachContinuityEnabled, coachRoleVariant])

  const toggleScenarioSwitcher = () => {
    setIsScenarioSwitcherOpen(!isScenarioSwitcherOpen)
  }

  const value = {
    scenarios,
    currentScenario,
    setScenario,
    scenarioCatalogKey,
    isScenarioSwitcherOpen,
    toggleScenarioSwitcher,
    coachContinuityEnabled,
    setCoachContinuityEnabled,
    coachRoleVariant,
    coachRoleLabels,
    setCoachRoleVariant,
    teamsCallsEnabled,
    setTeamsCallsEnabled
  }

  return (
    <ScenarioContext.Provider value={value}>
      {children}
    </ScenarioContext.Provider>
  )
}

export function useScenario() {
  const context = React.useContext(ScenarioContext)
  if (context === undefined) {
    throw new Error("useScenario must be used within a ScenarioProvider")
  }
  return context
} 
