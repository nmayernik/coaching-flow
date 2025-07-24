"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { formatDateForDisplay, convertValueTimeToDisplay } from "./utils";
import { categoryIcons } from "./categoryIcons";

interface Student {
  id: number;
  name: string;
  age: string;
}

interface Step1SummaryProps {
  selectedStudent: Student | null;
  category: string;
  onEdit: () => void;
}

export function Step1Summary({ selectedStudent, category, onEdit }: Step1SummaryProps) {
  const iconData = categoryIcons[category];

  return (
    <div className="border border-gray-100 rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-3 lg:mb-4 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-start space-x-3 lg:space-x-4">
          {iconData && (
            <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${iconData.bgColor} flex-shrink-0`}>
              {(() => {
                const IconComponent = iconData.icon;
                return (
                  <IconComponent 
                    className={`w-4 h-4 lg:w-5 lg:h-5 ${iconData.iconColor}`}
                    strokeWidth={1.5}
                  />
                );
              })()}
            </div>
          )}
          <div className="space-y-1">
            <p className="font-medium text-sm lg:text-base text-gray-800">{category} appointment</p>
            <p className="text-gray-700 text-xs lg:text-sm">For {selectedStudent?.name} ({selectedStudent?.age}) · 45 minutes</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="default" 
          onClick={onEdit}
          className="text-blue-700 border-gray-300 hover:bg-blue-50 transition-colors duration-200 ease-out text-sm px-3 py-2"
        >
          <SquarePen className="w-3 h-3 lg:w-4 lg:h-4" />
          Edit
        </Button>
      </div>
    </div>
  );
}

interface Step2SummaryProps {
  topic: string;
  note: string;
  onEdit: () => void;
  isIntroToCollegeCoach?: boolean;
}

export function Step2Summary({ topic, note, onEdit, isIntroToCollegeCoach = false }: Step2SummaryProps) {
  return (
    <div className="border border-gray-100 rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-3 lg:mb-4 bg-white">
      <div className="flex justify-between items-center">
        <div>
          {isIntroToCollegeCoach ? (
            <>
              <h2 className="text-purple-600 font-semibold text-xs lg:text-sm">Notes</h2>
              <p className="font-medium text-sm lg:text-base text-gray-800">
                {note ? note : "No notes added"}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-purple-600 font-semibold text-xs lg:text-sm">Topic</h2>
              <p className="font-medium text-sm lg:text-base text-gray-800">{topic}</p>
              {note && <p className="text-gray-700 text-xs lg:text-sm mt-1">Note: {note}</p>}
            </>
          )}
        </div>
        <Button 
          variant="outline" 
          size="default" 
          onClick={onEdit}
          className="text-blue-700 border-gray-300 hover:bg-blue-50 transition-colors duration-200 ease-out text-sm px-3 py-2"
        >
          <SquarePen className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
          Edit
        </Button>
      </div>
    </div>
  );
}

interface SuccessScreenProps {
  selectedStudent: Student | null;
  category: string;
  topic: string;
  date: string;
  time: string;
  phone: string;
  onScheduleAnother: () => void;
  onViewCalendar: () => void;
}

export function SuccessScreen({ 
  selectedStudent, 
  category, 
  topic, 
  date, 
  time, 
  phone, 
  onScheduleAnother, 
  onViewCalendar 
}: SuccessScreenProps) {
  const iconData = categoryIcons[category];

  return (
    <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 text-center transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in">
      {/* Success Icon */}
      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
        <svg className="w-8 h-8 lg:w-10 lg:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      {/* Success Message */}
      <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-2 lg:mb-3">
        Appointment Scheduled!
      </h2>
      <p className="text-gray-600 text-sm lg:text-base mb-6 lg:mb-8">
        Your coaching appointment has been successfully scheduled. You&apos;ll receive a confirmation email shortly.
      </p>
      
      {/* Appointment Details */}
      <div className="bg-gray-50 rounded-lg lg:rounded-xl p-4 lg:p-6 mb-6 lg:mb-8 text-left">
        <h3 className="font-medium text-gray-800 mb-3 lg:mb-4 text-sm lg:text-base">Appointment Details</h3>
        <div className="space-y-2 lg:space-y-3 text-xs lg:text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Student:</span>
            <span className="font-medium text-gray-800">{selectedStudent?.name} ({selectedStudent?.age})</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Category:</span>
            <div className="flex items-center space-x-2">
              {iconData && (
                <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded-full flex items-center justify-center ${iconData.bgColor}`}>
                  {(() => {
                    const IconComponent = iconData.icon;
                    return (
                      <IconComponent 
                        className={`w-2 h-2 lg:w-3 lg:h-3 ${iconData.iconColor}`}
                        strokeWidth={1.5}
                      />
                    );
                  })()}
                </div>
              )}
              <span className="font-medium text-gray-800">{category}</span>
            </div>
          </div>
          {category !== "Intro to College Coach" && (
            <div className="flex justify-between">
              <span className="text-gray-600">Topic:</span>
              <span className="font-medium text-gray-800">{topic}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-medium text-gray-800">
              {formatDateForDisplay(date)} at {convertValueTimeToDisplay(time)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium text-gray-800">{phone}</span>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={onScheduleAnother}
          className="flex-1 text-sm lg:text-base text-blue-700 border-gray-300 hover:bg-blue-50 transition-colors duration-200 ease-out rounded-lg lg:rounded-xl py-3 lg:py-4"
        >
          Schedule Another
        </Button>
        <Button 
          size="lg" 
          onClick={onViewCalendar}
          className="flex-1 text-sm lg:text-base bg-yellow-500 hover:bg-yellow-400 text-blue-800 rounded-lg lg:rounded-xl font-semibold py-3 lg:py-4"
        >
          View Calendar
        </Button>
      </div>
    </div>
  );
} 