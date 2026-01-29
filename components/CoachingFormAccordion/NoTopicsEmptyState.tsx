"use client"

import * as React from "react";
import { AlertCircle } from "lucide-react";

interface NoTopicsEmptyStateProps {
  studentName: string;
}

export function NoTopicsEmptyState({ studentName }: NoTopicsEmptyStateProps) {
  return (
    <div className="relative">
      {/* Blurred background topics */}
      <div className="absolute inset-0 blur-sm opacity-30 pointer-events-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {/* Mock topic cards that will be blurred */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="p-3 sm:p-4 lg:p-4 rounded-2xl lg:rounded-xl border border-gray-200 bg-white h-32 flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 mb-2 lg:mb-3"></div>
              <div className="space-y-1">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Empty state overlay */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <AlertCircle className="h-8 w-8 text-gray-400" />
          <div className="space-y-2">
            <h3 className="font-medium text-gray-800">
              No topics available for {studentName}
            </h3>
            <p className="text-sm text-gray-600">
              Please try again later
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 