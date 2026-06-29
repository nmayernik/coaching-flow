"use client"

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RotateCw, Calendar, Lightbulb, Clock, Globe } from "lucide-react";
import { CoachRoleLabels, getCoachRoleLabels } from "@/lib/coachRoleLabels";

interface CoachContinuityDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  coachRoleLabels?: CoachRoleLabels;
}

export function CoachContinuityDialog({
  isOpen,
  onOpenChange,
  coachRoleLabels = getCoachRoleLabels()
}: CoachContinuityDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <RotateCw className="w-5 h-5 text-blue-700" />
            </div>
            <DialogTitle className="text-lg lg:text-xl font-semibold text-blue-900">
              {coachRoleLabels.titleSingular} continuity in College Coach
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm lg:text-base text-gray-700 mt-2">
            You can now schedule sessions with a {coachRoleLabels.singular} you&apos;ve met with before.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 lg:mt-6">
          <h3 className="text-sm lg:text-base font-medium text-gray-900 mb-3 lg:mb-4">
            What this means for you
          </h3>
          
          <div className="space-y-3 lg:space-y-4">
            {/* First bullet point */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-700" />
                </div>
              </div>
              <p className="text-sm lg:text-base text-gray-700 flex-1">
                If you&apos;ve already had a session with a {coachRoleLabels.singular} on a topic, you can choose to schedule a follow-up session with the same {coachRoleLabels.singular}.
              </p>
            </div>
            
            {/* Second bullet point */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-blue-700" />
                </div>
              </div>
              <p className="text-sm lg:text-base text-gray-700 flex-1">
                Certain {coachRoleLabels.plural} specialize in certain topics, so you may not be able to have every session with the same {coachRoleLabels.singular}.
              </p>
            </div>
            
            {/* Third bullet point */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-700" />
                </div>
              </div>
              <p className="text-sm lg:text-base text-gray-700 flex-1">
                For quicker appointment times, you can still book with {coachRoleLabels.any} on our team. We share all our notes about your past interactions so we can pick up right where you left off.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 lg:mt-6 pt-4 lg:pt-5 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Globe className="w-3.5 h-3.5 text-blue-700" />
            </div>
            <p className="text-sm lg:text-base text-gray-700">
              For more details, visit the{" "}
              <a 
                href="#" 
                className="text-blue-700 hover:text-blue-800 underline font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  // In a real app, this would navigate to the help center
                }}
              >
                Help Center
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
