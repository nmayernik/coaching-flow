"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Header from "@/components/ui/header/header";
import Footer from "@/components/ui/footer";
import CoachingFormAccordion from "@/components/CoachingFormAccordion";
import { ScenarioProvider, useScenario } from "@/contexts/ScenarioContext";
import { ScenarioSwitcher } from "@/components/ScenarioSwitcher";
import { Button } from "@/components/ui/button";
import { ScenarioCatalogKey } from "@/lib/scenarios/types";

interface CoachingFormContentProps {
  showChrome?: boolean;
  showScenarioSwitcher?: boolean;
  onRequestClose?: () => void;
}

interface CoachingFormFeatureProps extends CoachingFormContentProps {
  scenarioCatalogKey?: ScenarioCatalogKey;
}

function CoachingFormContent({
  showChrome = true,
  showScenarioSwitcher = true,
  onRequestClose,
}: CoachingFormContentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const {
    scenarios,
    currentScenario,
    setScenario,
    isScenarioSwitcherOpen,
    toggleScenarioSwitcher,
    coachContinuityEnabled,
    setCoachContinuityEnabled,
    coachRoleVariant,
    coachRoleLabels,
    setCoachRoleVariant,
    teamsCallsEnabled,
    setTeamsCallsEnabled,
  } = useScenario();

  const steps = [
    {
      number: 1,
      title:
        currentScenario === "big-c-coaching"
          ? "Focus and topic"
          : "Student and topic",
      description: "Description",
    },
    { number: 2, title: "Focus area", description: "Description" },
    { number: 3, title: "Date and time", description: "Description" },
  ];

  const getStepState = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) return "completed";
    if (currentStep === stepIndex) return "current";
    return "upcoming";
  };

  const isModal = !showChrome && onRequestClose != null;

  return (
    <div
      className={`flex flex-col bg-[#fafafa] ${isModal ? "h-full min-h-0" : ""}`}
    >
      {showChrome && <Header />}

      {!showChrome && (
        <div className="border-b border-[#dddddd] bg-white">
          <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
            <div className="relative flex h-[64px] items-center justify-center">
              <div className="text-sm font-semibold text-[#1A475F]">
                New Appointment
              </div>
              {onRequestClose && (
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={onRequestClose}
                  className="absolute right-0 rounded-full border border-[#b3b3b3]"
                  aria-label="Close booking form"
                >
                  <X className="h-5 w-5 text-[#1A475F]" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {showScenarioSwitcher && (
        <ScenarioSwitcher
          scenarios={scenarios}
          currentScenario={currentScenario}
          onScenarioChange={setScenario}
          isOpen={isScenarioSwitcherOpen}
          onToggle={toggleScenarioSwitcher}
          coachContinuityEnabled={coachContinuityEnabled}
          onCoachContinuityChange={setCoachContinuityEnabled}
          coachRoleVariant={coachRoleVariant}
          coachRoleLabels={coachRoleLabels}
          onCoachRoleVariantChange={setCoachRoleVariant}
          teamsCallsEnabled={teamsCallsEnabled}
          onTeamsCallsChange={setTeamsCallsEnabled}
        />
      )}

      <main
        className={`flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pt-8 lg:pt-12 pb-12 lg:pb-16 ${isModal ? "min-h-0 overflow-y-auto" : ""}`}
      >
        <div className="mb-6 lg:hidden">
          <h1 className="text-2xl font-medium leading-8 text-blue-800">
            Schedule a Coaching Session
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-[21px] lg:gap-16">
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <div className="mb-4">
                <h1 className="text-2xl font-medium leading-8 text-blue-800">
                  Schedule a Coaching Session
                </h1>
              </div>

              <div className="w-full py-4 lg:py-6">
                <div className="relative">
                  <div
                    className="absolute left-3 sm:left-4 w-0.5"
                    style={{
                      top: "20px",
                      height: `${(steps.length - 1) * 64}px`,
                    }}
                  >
                    <div
                      className="absolute w-full bg-blue-700 transition-all duration-300 ease-out"
                      style={{
                        top: "0px",
                        height: `${Math.max(0, Math.min(completedSteps.length, steps.length - 1) * 64)}px`,
                      }}
                    />
                    <div
                      className="absolute w-full"
                      style={{
                        top: `${Math.min(completedSteps.length, steps.length - 1) * 64}px`,
                        bottom: "0px",
                        backgroundImage:
                          "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
                        backgroundSize: "2px 8px",
                        backgroundRepeat: "repeat-y",
                      }}
                    />
                  </div>

                  <div className="space-y-8">
                    {steps.map((step, index) => {
                      const state = getStepState(index);

                      return (
                        <div
                          key={index}
                          className="relative flex items-start space-x-3 sm:space-x-4"
                        >
                          <div
                            className={`relative z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              state === "completed"
                                ? "bg-blue-700 border-blue-700"
                                : state === "current"
                                  ? "bg-blue-700 border-blue-700"
                                  : "bg-gray-100 border-gray-100"
                            }`}
                          >
                            {state === "completed" ? (
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <span
                                className={`text-xs sm:text-sm font-medium ${state === "current" ? "text-white" : "text-gray-700"}`}
                              >
                                {step.number}
                              </span>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div
                              className={`text-sm font-medium mt-1 ${state === "current" ? "text-blue-800" : "text-gray-700"}`}
                            >
                              {step.title}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <div className="relative">
              <div className="absolute top-4 left-[31px] right-[31px] h-0.5">
                <div
                  className="absolute h-full bg-blue-700 transition-all duration-300 ease-out"
                  style={{
                    left: "0px",
                    width: `${Math.max(0, Math.min(completedSteps.length, steps.length - 1) / (steps.length - 1)) * 100}%`,
                  }}
                />
                <div
                  className="absolute h-full"
                  style={{
                    left: `${(Math.min(completedSteps.length, steps.length - 1) / (steps.length - 1)) * 100}%`,
                    right: "0px",
                    backgroundImage:
                      "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
                    backgroundSize: "8px 2px",
                    backgroundRepeat: "repeat-x",
                  }}
                />
              </div>

              <div className="flex justify-between items-start">
                {steps.map((step, index) => {
                  const state = getStepState(index);

                  return (
                    <div
                      key={index}
                      className="relative flex w-[62px] shrink-0 flex-col items-center"
                    >
                      <div
                        className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          state === "completed"
                            ? "bg-blue-700 border-blue-700"
                            : state === "current"
                              ? "bg-blue-700 border-blue-700"
                              : "bg-gray-100 border-gray-100"
                        }`}
                      >
                        {state === "completed" ? (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <span
                            className={`text-sm font-medium ${state === "current" ? "text-white" : "text-gray-700"}`}
                          >
                            {step.number}
                          </span>
                        )}
                      </div>
                      <span className="mt-1.5 w-full text-center text-xs leading-[15px] text-gray-700">
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative z-10 pointer-events-auto min-w-0 lg:col-span-3">
            <CoachingFormAccordion
              onStepChange={setCurrentStep}
              onCompletedStepsChange={setCompletedSteps}
            />
          </div>
        </div>
      </main>

      {showChrome && <Footer />}
    </div>
  );
}

export function CoachingFormFeature({
  scenarioCatalogKey = "default",
  showChrome = true,
  showScenarioSwitcher = true,
  onRequestClose,
}: CoachingFormFeatureProps) {
  return (
    <ScenarioProvider scenarioCatalogKey={scenarioCatalogKey}>
      <CoachingFormContent
        showChrome={showChrome}
        showScenarioSwitcher={showScenarioSwitcher}
        onRequestClose={onRequestClose}
      />
    </ScenarioProvider>
  );
}
