"use client"
import Header from "./components/ui/header/header"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CustomRadioGroup, CustomRadioGroupItem } from "@/components/ui/custom-radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Users, HelpCircle, Grid3X3, User, ChevronLeft, ChevronRight, Grip } from "lucide-react"
import Footer  from "./components/ui/footer"
import CoachingFormAccordion from "./components/CoachingFormAccordion"


export default function Component() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const isIntroToCollegeCoach = selectedCategory === "Intro to College Coach";

  const steps = [
    { number: 1, title: "Student and topic", description: "Description" },
    { number: 2, title: "Focus area", description: "Description" },
    { number: 3, title: "Date and time", description: "Description" }
  ];

  const getStepState = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) return "completed";
    if (currentStep === stepIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 md:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-2 sm:pt-3 lg:pt-12 pb-4 sm:pb-6 lg:pb-8 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-16">
          {/* Left Sidebar - Hidden on mobile, shows as progress bar instead */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
            {/* Header content moved to sidebar */}
            <div className="mb-4 space-y-1">
              <h1 className="text-2xl font-semibold text-blue-800">Schedule a Coaching Session</h1>
              <p className="text-sm sm:text-base text-gray-700">Book a call with one of our experts to discuss your needs.</p>
            </div>

            {/* Progress Steps Container */}
            <div className="w-full py-4 lg:py-6">
              <div className="relative">
                {/* Continuous vertical connector line */}
                <div className="absolute left-3 sm:left-4 w-0.5" style={{ 
                  top: '20px', 
                  height: `${(steps.length - 1) * 56}px` 
                }}>
                  {/* Blue solid line for completed progress */}
                  <div 
                    className="absolute w-full bg-blue-800 transition-all duration-300 ease-out"
                    style={{
                      top: '0px',
                      height: `${Math.max(0, Math.min(completedSteps.length, steps.length - 1) * 56)}px`
                    }}
                  />
                  {/* Dotted line for remaining progress */}
                  <div 
                    className="absolute w-full"
                    style={{
                      top: `${Math.min(completedSteps.length, steps.length - 1) * 56}px`,
                      bottom: '0px',
                      backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                      backgroundSize: '2px 8px',
                      backgroundRepeat: 'repeat-y'
                    }}
                  />
                </div>
                
                <div className="space-y-6 lg:space-y-8">
                  {steps.map((step, index) => {
                    const state = getStepState(index);
                    
                    return (
                      <div key={index} className="relative flex items-start space-x-3 sm:space-x-4">
                        {/* Step Indicator - positioned to align with the vertical line */}
                        <div className={`relative z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          state === "completed" 
                            ? "bg-blue-800 border-blue-800" 
                            : state === "current"
                            ? "bg-blue-800 border-blue-800"
                            : "bg-gray-100 border-gray-100"
                        }`}>
                          {state === "completed" ? (
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className={`text-xs sm:text-sm font-medium ${
                              state === "current" ? "text-white" : "text-gray-700"
                            }`}>
                              {step.number}
                            </span>
                          )}
                        </div>
                        
                        {/* Step Content */}
                        <div className="min-w-0 flex-1">
                          
                          <div className={`text-sm lg:text-md font-medium mt-1 ${
                            state === "current" ? "text-blue-800" : "text-gray-700"
                          }`}>
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
          
          {/* Mobile Header and Stepper */}
          <div className="lg:hidden mb-4 sm:mb-6">
            {/* Mobile Header */}
            <div className="mb-4 space-y-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-blue-800">Schedule a Coaching Session</h1>
              <p className="text-sm text-gray-700">Book a call with one of our experts to discuss your needs.</p>
            </div>
            
            {/* Mobile Horizontal Stepper */}
            <div className="relative">
              {/* Horizontal connector line */}
              <div className="absolute top-4 left-6 right-6 h-0.5">
                {/* Blue solid line for completed progress */}
                <div 
                  className="absolute h-full bg-blue-800 transition-all duration-300 ease-out"
                  style={{
                    left: '0px',
                    width: `${Math.max(0, Math.min(completedSteps.length, steps.length - 1) / (steps.length - 1)) * 100}%`
                  }}
                />
                {/* Dotted line for remaining progress */}
                <div 
                  className="absolute h-full"
                  style={{
                    left: `${Math.min(completedSteps.length, steps.length - 1) / (steps.length - 1) * 100}%`,
                    right: '0px',
                    backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                    backgroundSize: '8px 2px',
                    backgroundRepeat: 'repeat-x'
                  }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                {steps.map((step, index) => {
                  const state = getStepState(index);
                  
                  return (
                    <div key={index} className="relative flex flex-col items-center">
                      {/* Step Indicator */}
                      <div className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        state === "completed" 
                          ? "bg-blue-800 border-blue-800" 
                          : state === "current"
                          ? "bg-blue-800 border-blue-800"
                          : "bg-gray-100 border-gray-100"
                      }`}>
                        {state === "completed" ? (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className={`text-sm font-medium ${
                            state === "current" ? "text-white" : "text-gray-700"
                          }`}>
                            {step.number}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Form - Now using Accordion */}
          <div className="lg:col-span-3">
            <CoachingFormAccordion 
              onStepChange={setCurrentStep}
              onCompletedStepsChange={setCompletedSteps}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>
      </main>
      
      <Footer/>
    </div>
  )
}
