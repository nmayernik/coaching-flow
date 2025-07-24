"use client"

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Student {
  id: number;
  name: string;
  age: string;
}

interface AddStudentForm {
  firstName: string;
  lastName: string;
  yearOfGraduation: string;
  relationshipToStudent: string;
  inviteStudent: boolean;
}

interface AddStudentModalProps {
  students: Student[];
  onAddStudent: (student: Student) => void;
}

export function AddStudentModal({ students, onAddStudent }: AddStudentModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [form, setForm] = React.useState<AddStudentForm>({
    firstName: "",
    lastName: "",
    yearOfGraduation: "",
    relationshipToStudent: "",
    inviteStudent: false
  });
  const [error, setError] = React.useState("");

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      yearOfGraduation: "",
      relationshipToStudent: "",
      inviteStudent: false
    });
    setError("");
  };

  const validateForm = () => {
    if (!form.firstName.trim()) return "First name is required.";
    if (!form.lastName.trim()) return "Last name is required.";
    if (!form.yearOfGraduation) return "Year of graduation is required.";
    if (!form.relationshipToStudent) return "Relationship to student is required.";
    return "";
  };

  const handleSubmit = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Create new student object
    const newStudent: Student = {
      id: Math.max(...students.map(s => s.id)) + 1,
      name: `${form.firstName} ${form.lastName}`,
      age: form.yearOfGraduation
    };

    // Call parent handler
    onAddStudent(newStudent);
    
    // Reset and close
    resetForm();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetForm();
    }}>
      <DialogTrigger asChild>
        <button className="flex items-center text-blue-700 hover:text-blue-800 mt-3 text-xs lg:text-sm font-medium transition-colors duration-200 ease-out">
          <svg className="w-3 h-3 lg:w-4 lg:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add student
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-xl lg:rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <DialogHeader className="flex-1">
            <DialogTitle className="text-xl font-semibold text-gray-800">Student Details</DialogTitle>
            <p className="text-sm text-gray-600 mt-1">
              An asterisk (<span className="text-red-500">*</span> ) indicates a required field.
            </p>
          </DialogHeader>
        </div>

        <div className="space-y-6">
          {/* First Name and Last Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-lg font-medium text-gray-700 mb-2 block">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                type="text"
                value={form.firstName}
                onChange={(e) => setForm(prev => ({ ...prev, firstName: e.target.value }))}
                className="rounded-lg lg:rounded-xl border-gray-300"
                placeholder=""
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-lg font-medium text-gray-700 mb-2 block">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                type="text"
                value={form.lastName}
                onChange={(e) => setForm(prev => ({ ...prev, lastName: e.target.value }))}
                className="rounded-lg lg:rounded-xl border-gray-300"
                placeholder=""
              />
            </div>
          </div>

          {/* Year of Graduation */}
          <div>
            <Label htmlFor="yearOfGraduation" className="text-lg font-medium text-gray-700 mb-2 block">
              Year of Graduation <span className="text-red-500">*</span>
            </Label>
            <Select value={form.yearOfGraduation} onValueChange={(value) => setForm(prev => ({ ...prev, yearOfGraduation: value }))}>
              <SelectTrigger className="rounded-lg lg:rounded-xl border-gray-300">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pre-K">Pre-K</SelectItem>
                <SelectItem value="Kindergarten">Kindergarten</SelectItem>
                <SelectItem value="1st grade">1st grade</SelectItem>
                <SelectItem value="2nd grade">2nd grade</SelectItem>
                <SelectItem value="3rd grade">3rd grade</SelectItem>
                <SelectItem value="4th grade">4th grade</SelectItem>
                <SelectItem value="5th grade">5th grade</SelectItem>
                <SelectItem value="6th grade">6th grade</SelectItem>
                <SelectItem value="7th grade">7th grade</SelectItem>
                <SelectItem value="8th grade">8th grade</SelectItem>
                <SelectItem value="9th grade">9th grade</SelectItem>
                <SelectItem value="10th grade">10th grade</SelectItem>
                <SelectItem value="11th grade">11th grade</SelectItem>
                <SelectItem value="12th grade">12th grade</SelectItem>
                <SelectItem value="College Freshman">College Freshman</SelectItem>
                <SelectItem value="College Sophomore">College Sophomore</SelectItem>
                <SelectItem value="College Junior">College Junior</SelectItem>
                <SelectItem value="College Senior">College Senior</SelectItem>
                <SelectItem value="Graduate Student">Graduate Student</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Relationship to Student */}
          <div>
            <Label htmlFor="relationshipToStudent" className="text-lg font-medium text-gray-700 mb-2 block">
              Relationship to Student <span className="text-red-500">*</span>
            </Label>
            <Select value={form.relationshipToStudent} onValueChange={(value) => setForm(prev => ({ ...prev, relationshipToStudent: value }))}>
              <SelectTrigger className="rounded-lg lg:rounded-xl border-gray-300">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Parent/Guardian">Parent/Guardian</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Grandparent">Grandparent</SelectItem>
                <SelectItem value="Sibling">Sibling</SelectItem>
                <SelectItem value="Other Family Member">Other Family Member</SelectItem>
                <SelectItem value="Teacher/Counselor">Teacher/Counselor</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Invite Student Checkbox */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="inviteStudent"
              checked={form.inviteStudent}
              onCheckedChange={(checked) => setForm(prev => ({ ...prev, inviteStudent: checked as boolean }))}
              className="rounded border-gray-300"
            />
            <Label htmlFor="inviteStudent" className="text-sm text-gray-700 leading-5">
              Invite your student to set up their own College Coach login
            </Label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <DialogFooter className="flex flex-row gap-3 mt-8 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              resetForm();
              setIsOpen(false);
            }}
            className="flex-1 text-gray-700 border-gray-300 hover:bg-gray-50 rounded-lg lg:rounded-xl py-3 transition-colors duration-200 ease-out"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-blue-800 rounded-lg lg:rounded-xl py-3 font-semibold transition-colors duration-200 ease-out"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 