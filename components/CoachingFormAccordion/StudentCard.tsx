"use client"

import * as React from "react";

interface Student {
  id: number;
  name: string;
  age: string;
  sessionsAvailable?: number;
}

interface StudentCardProps {
  student: Student;
  index: number;
  isSelected: boolean;
  onSelect: (student: Student) => void;
}

export function StudentCard({ student, index, isSelected, onSelect }: StudentCardProps) {
  const sessionsAvailable = student.sessionsAvailable ?? 3;
  const isDisabled = sessionsAvailable === 0;

  const handleClick = () => {
    if (!isDisabled) onSelect(student);
  };

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-pressed={isSelected}
      aria-label={`Select ${student.name}, ${student.age}`}
      onClick={handleClick}
      className={`w-full text-left p-3 md:p-4 rounded-2xl lg:rounded-xl border transition-colors duration-200 ease-out flex flex-col justify-between shadow-sm touch-manipulation h-32 relative z-10 ${
        isDisabled
          ? "border-gray-200 bg-gray-25 cursor-not-allowed"
          : isSelected
            ? "ring-blue-700 ring-2 border-0 hover:bg-blue-50 active:bg-blue-100 cursor-pointer"
            : "border-gray-400 hover:bg-gray-25 active:bg-gray-50 cursor-pointer"
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <div className={`font-medium ${isDisabled ? "text-gray-500" : "text-gray-800"}`}>{student.name}</div>
          <div className={`text-sm ${isDisabled ? "text-gray-400" : "text-gray-700"}`}>{student.age}</div>
          <div className={`text-xs mt-1 ${isDisabled ? "text-gray-400" : "text-gray-600"}`}>
            {sessionsAvailable} {sessionsAvailable === 1 ? "session" : "sessions"} remaining
          </div>
        </div>
      </div>
    </button>
  );
} 