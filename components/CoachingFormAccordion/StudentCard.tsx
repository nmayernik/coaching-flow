"use client"

import * as React from "react";
import { getAvailableCategories } from "@/lib/topicLogicData";
import { getAvatarColor, getInitials } from "./utils";
import { Badge } from "@/components/ui/badge";

interface Student {
  id: number;
  name: string;
  age: string;
}

interface StudentCardProps {
  student: Student;
  index: number;
  isSelected: boolean;
  onSelect: (student: Student) => void;
}

export function StudentCard({ student, index, isSelected, onSelect }: StudentCardProps) {
  const initials = getInitials(student.name);
  const avatarColor = getAvatarColor(index);
  const availableCategoriesCount = getAvailableCategories(student.age).length;

  return (
    <label 
      className={`p-3 md:p-4 rounded-2xl lg:rounded-xl border cursor-pointer transition-colors duration-200 ease-out flex flex-col justify-between shadow-sm touch-manipulation ${
        isSelected 
          ? "ring-blue-700 ring-2 border-0 hover:bg-blue-50 active:bg-blue-100" 
          : "border-gray-400 hover:bg-gray-25 active:bg-gray-50"
      }`}
      style={{ minHeight: '44px' }}
    >
      <input
        type="radio"
        name="student"
        value={student.id.toString()}
        checked={isSelected}
        onChange={() => onSelect(student)}
        className="sr-only"
        aria-label={`Select ${student.name}, ${student.age}`}
      />
      <div className="space-y-2 lg:space-y-3">
        <div className="flex flex-col justify-between">
          <div className="font-medium  text-gray-800">{student.name}</div>
          <div className="text-sm text-gray-700 mb-2">{student.age}</div>
        </div>
        <Badge variant="session">
          3/3 sessions available
        </Badge>
      </div>
    </label>
  );
} 