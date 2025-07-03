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

  const steps = [
    { number: 1, title: "Student and expert", description: "Description" },
    { number: 2, title: "Session topic", description: "Description" },
    { number: 3, title: "Date & time", description: "Description" }
  ];

  const getStepState = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) return "completed";
    if (currentStep === stepIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 sm:px-6 py-12">
        <div className="mb-12 space-y-1">
       <h1 className="text-[32px] font-semibold text-blue-800">Schedule a Coaching Session</h1>
       <p className="text-base text-gray-700">Book a call with one of our experts to discuss your needs.</p>
       </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">

            {/* Progress Steps Container */}
            <div className="sticky top-4 bg-white rounded-2xl w-full border border-gray-100 p-5">
              <div className="relative">
                {/* Continuous vertical connector line */}
                <div className="absolute left-4 w-0.5" style={{ top: '20px', bottom: '20px' }}>
                  {/* Blue solid line for completed progress */}
                  <div 
                    className="absolute w-full bg-blue-800 transition-all duration-300"
                    style={{
                      top: '0px',
                      height: `${Math.max(0, (completedSteps.length) * 56 + (currentStep >= 2 ? 24 : 0))}px`
                    }}
                  />
                  {/* Dotted line for remaining progress */}
                  <div 
                    className="absolute w-full"
                    style={{
                      top: `${(completedSteps.length) * 56 + (currentStep >= 2 ? 24 : 0)}px`,
                      bottom: '0px',
                      backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
                      backgroundSize: '2px 8px',
                      backgroundRepeat: 'repeat-y'
                    }}
                  />
                </div>
                
                <div className="space-y-8">
                  {steps.map((step, index) => {
                    const state = getStepState(index);
                    
                    return (
                      <div key={index} className="relative flex items-start space-x-4">
                        {/* Step Indicator - positioned to align with the vertical line */}
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
                        
                        {/* Step Content */}
                        <div className="min-w-0 flex-1">
                          
                          <div className={`text-md font-semibold mt-1 ${
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
          
          {/* Main Form - Now using Accordion */}
          <div className="lg:col-span-9">
            <CoachingFormAccordion 
              onStepChange={setCurrentStep}
              onCompletedStepsChange={setCompletedSteps}
            />
          </div>
        </div>
      </main>
      
      <Footer/>
    </div>
  )
}
