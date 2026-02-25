"use client"

import * as React from "react"
import Link from "next/link"
import { Settings, X, Copy, Check, Paintbrush } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "next/navigation"

export type Scenario = 
  | "default" 
  | "no-appointments" 
  | "no-topics-available" 
  | "with-existing-students"
  | "no-dates-available"
  | "hide-intro-after-call"

interface ScenarioSwitcherProps {
  currentScenario: Scenario
  onScenarioChange: (scenario: Scenario) => void
  isOpen: boolean
  onToggle: () => void
  coachContinuityEnabled: boolean
  onCoachContinuityChange: (enabled: boolean) => void
  teamsCallsEnabled: boolean
  onTeamsCallsChange: (enabled: boolean) => void
}

const scenarios = [
  {
    id: "default" as Scenario,
    name: "Default",
    description: "Normal flow with all features available",
    url: "/"
  },
  {
    id: "with-existing-students" as Scenario,
    name: "With Existing Students",
    description: "Students from other services are available to add",
    url: "/?scenario=with-existing-students"
  },
  {
    id: "no-appointments" as Scenario,
    name: "No Appointments",
    description: "All students have 0/3 sessions available",
    url: "/?scenario=no-appointments"
  },
  {
    id: "no-topics-available" as Scenario,
    name: "No Topics Available",
    description: "No topics available for selected student",
    url: "/?scenario=no-topics-available"
  },
  {
    id: "no-dates-available" as Scenario,
    name: "No Dates Available",
    description: "No dates/times available for selected topic",
    url: "/?scenario=no-dates-available"
  },
  {
    id: "hide-intro-after-call" as Scenario,
    name: "Hide Intro (student has had calls)",
    description: "Intro to College Coach hidden for students with >0 prior calls",
    url: "/?scenario=hide-intro-after-call"
  }
]

export function ScenarioSwitcher({ currentScenario, onScenarioChange, isOpen, onToggle, coachContinuityEnabled, onCoachContinuityChange, teamsCallsEnabled, onTeamsCallsChange }: ScenarioSwitcherProps) {
  const searchParams = useSearchParams()
  const [copiedUrl, setCopiedUrl] = React.useState<string | null>(null)

  const getCurrentUrl = () => {
    const params = new URLSearchParams(searchParams.toString())
    const baseUrl = window.location.origin + window.location.pathname
    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl
  }

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedUrl(url)
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <Button
        variant="secondary"
        size="default"
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-800 font-mono text-white shadow-sm"
      >
        <Paintbrush className="w-4 h-4 mr-2" />
        Scenarios
      </Button>

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onToggle}>
          <div 
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                <Link
                  href="/changelog"
                  className="text-gray-800 no-underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  title="Changelog"
                >
                  UI Scenarios
                </Link>
              </h2>
              <Button variant="ghost" size="sm" onClick={onToggle}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Coach Continuity toggle */}
            <div className="mb-4 p-4 rounded-lg border border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <Label htmlFor="coach-continuity" className="text-sm font-medium text-gray-800 cursor-pointer">
                    Coach Continuity
                  </Label>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {coachContinuityEnabled
                      ? "Banner and option to book with previous coach are shown."
                      : "All coaches’ availability shown; no coach continuity messaging."}
                  </p>
                </div>
                <Switch
                  id="coach-continuity"
                  checked={coachContinuityEnabled}
                  onCheckedChange={onCoachContinuityChange}
                  aria-label="Enable Coach Continuity"
                />
              </div>
            </div>

            {/* Teams calls toggle */}
            <div className="mb-6 p-4 rounded-lg border border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <Label htmlFor="teams-calls" className="text-sm font-medium text-gray-800 cursor-pointer">
                    Teams calls
                  </Label>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {teamsCallsEnabled
                      ? "Video call UI: backup phone field, Video Calls dialog, vertical success screen with Teams link."
                      : "Phone-call flow: standard phone field and success screen."}
                  </p>
                </div>
                <Switch
                  id="teams-calls"
                  checked={teamsCallsEnabled}
                  onCheckedChange={onTeamsCallsChange}
                  aria-label="Enable Teams calls"
                />
              </div>
            </div>

            <div className="space-y-4">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    currentScenario === scenario.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => onScenarioChange(scenario.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">{scenario.name}</h3>
                    {currentScenario === scenario.id && (
                      <Badge variant="secondary" className="text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                  
                  {/* URL Section */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-1">URL for ADO:</p>
                      <p className="text-xs font-mono text-gray-700 truncate">
                        {scenario.url}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        copyUrl(window.location.origin + scenario.url)
                      }}
                      className="ml-2 flex-shrink-0"
                    >
                      {copiedUrl === window.location.origin + scenario.url ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Current URL</h3>
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono text-gray-700 truncate flex-1">
                  {getCurrentUrl()}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyUrl(getCurrentUrl())}
                  className="ml-2 flex-shrink-0"
                >
                  {copiedUrl === getCurrentUrl() ? (
                    <Check className="w-3 h-3 text-green-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 