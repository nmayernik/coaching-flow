"use client"

import * as React from "react";
import { ExistingStudent } from "@/lib/utils";
import { getAvatarColor, getInitials } from "./utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface ExistingStudentCardProps {
  existingStudent: ExistingStudent;
  onAdd: (existingStudent: ExistingStudent) => void;
}

export function ExistingStudentCard({ existingStudent, onAdd }: ExistingStudentCardProps) {
  const initials = getInitials(`${existingStudent.firstName} ${existingStudent.lastName}`);
  const avatarColor = getAvatarColor(0); // Use consistent color for existing students

  return (
    <div 
      className="p-3 md:p-4 rounded-2xl lg:rounded-xl border border-dashed border-gray-400 bg-white flex flex-col justify-between shadow-sm touch-manipulation cursor-pointer hover:bg-gray-50 hover:border-gray-500 transition-colors duration-200 h-32"
      onClick={() => onAdd(existingStudent)}
    >
      <div className="flex justify-between items-center gap-4 h-full">
        <div className="flex flex-col space-y-1 h-full">
          <div className="font-medium text-gray-800">
            {existingStudent.firstName} {existingStudent.lastName}
          </div>
          <div className="text-sm text-gray-700">
            Available from another Bright Horizons benefit
          </div>
        </div>
        
        <Button
          type="button"
          size="lg"
          variant="link"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(existingStudent);
          }}
          className="px-2 self-center"
        >
          <PlusCircle className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
} 