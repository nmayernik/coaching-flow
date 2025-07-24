"use client"

import * as React from "react";
import { isCategoryAvailable, getAvailableTopics } from "@/lib/topicLogicData";
import { categoryDescriptions } from "./utils";
import { categoryIcons } from "./categoryIcons";

interface Student {
  id: number;
  name: string;
  age: string;
}

interface CategoryCardProps {
  categoryName: string;
  selectedStudent: Student | null;
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export function CategoryCard({ categoryName, selectedStudent, selectedCategory, onSelect }: CategoryCardProps) {
  const isAvailable = selectedStudent ? (categoryName === "Intro to College Coach" ? true : isCategoryAvailable(categoryName, selectedStudent.age)) : false;
  const availableTopicsCount = selectedStudent ? (categoryName === "Intro to College Coach" ? 1 : getAvailableTopics(categoryName, selectedStudent.age).length) : 0;
  
  const description = categoryDescriptions[categoryName] || "Category description";
  const iconData = categoryIcons[categoryName];

  const handleClick = () => {
    if (isAvailable) {
      onSelect(categoryName);
    }
  };

  return (
    <label 
      className={`p-3 sm:p-4 lg:p-4 rounded-lg lg:rounded-xl border cursor-pointer transition-colors duration-200 ease-out flex flex-col items-start touch-manipulation ${
        !isAvailable 
          ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60" 
          : selectedCategory === categoryName 
            ? "ring-blue-700 ring-2 border-white hover:bg-blue-25 active:bg-blue-100" 
            : "border-gray-400 hover:bg-gray-50 active:bg-gray-100"
      }`}
      onClick={handleClick}
      style={{ minHeight: '44px' }}
    >
      <input
        type="radio"
        name="category"
        value={categoryName}
        checked={selectedCategory === categoryName}
        onChange={() => handleClick()}
        className="sr-only"
        aria-label={`Select category: ${categoryName} - ${description}`}
      />
      
      {/* Icon circle */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 lg:mb-3 ${
        isAvailable ? iconData?.bgColor || "bg-gray-100" : "bg-gray-100"
      }`}>
        {iconData && (() => {
          const IconComponent = iconData.icon;
          return (
            <IconComponent 
              className={`w-5 h-5 ${isAvailable ? iconData.iconColor : "text-gray-400"}`}
              strokeWidth={1.5}
            />
          );
        })()}
      </div>
      
      {/* Content */}
      <div className="flex flex-col items-start">
        <div className={`font-medium text-sm lg:text-base ${isAvailable ? "text-gray-800" : "text-gray-500"}`}>
          {categoryName}
        </div>
        <div className={`text-xs lg:text-sm mt-1 ${isAvailable ? "text-gray-700" : "text-gray-400"}`}>
          {description}
        </div>

        {!isAvailable && selectedStudent && (
          <div className="text-xs text-gray-400 mt-1 lg:mt-2">
            Not available for {selectedStudent.age}
          </div>
        )}
        {categoryName === "Intro to College Coach" && (
          <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full mt-1 lg:mt-2">
            Recommended
          </span>
        )}
      </div>
    </label>
  );
} 