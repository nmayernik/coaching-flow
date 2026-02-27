"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getScenarioCatalog, isValidScenario } from "@/lib/scenarios/catalogs"
import { Scenario, ScenarioCatalogKey, ScenarioDefinition } from "@/lib/scenarios/types"

interface ScenarioContextType {
  scenarios: ScenarioDefinition[]
  currentScenario: Scenario
  setScenario: (scenario: Scenario) => void
  scenarioCatalogKey: ScenarioCatalogKey
  isScenarioSwitcherOpen: boolean
  toggleScenarioSwitcher: () => void
  coachContinuityEnabled: boolean
  setCoachContinuityEnabled: (enabled: boolean) => void
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

  const [currentScenario, setCurrentScenario] = React.useState<Scenario>(getInitialScenario)
  const [isScenarioSwitcherOpen, setIsScenarioSwitcherOpen] = React.useState(false)
  const [coachContinuityEnabled, setCoachContinuityEnabled] = React.useState(false)
  const [teamsCallsEnabled, setTeamsCallsEnabled] = React.useState(false)

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
  }, [searchParams, currentScenario, scenarios])

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