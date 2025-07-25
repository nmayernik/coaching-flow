"use client"

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  getAvailableCategories, 
  getAvailableTopics, 
  isCategoryAvailable,
  isTopicAvailable,
  getAllCategories
} from "../lib/topicLogicData";

// Extracted components
import { DateTimeSelector } from "./CoachingFormAccordion/DateTimeSelector";
import { PhoneNumberSelector } from "./CoachingFormAccordion/PhoneNumberSelector";
import { AddStudentModal } from "./CoachingFormAccordion/AddStudentModal";
import { StudentCard } from "./CoachingFormAccordion/StudentCard";
import { CategoryCard } from "./CoachingFormAccordion/CategoryCard";
import { TopicSelector } from "./CoachingFormAccordion/TopicSelector";
import { Step1Summary, Step2Summary, SuccessScreen } from "./CoachingFormAccordion/SummaryComponents";
import { Student, CoachingFormAccordionProps } from "./CoachingFormAccordion/types";

export default function CoachingFormAccordion({ 
  onStepChange, 
  onCompletedStepsChange,
  onCategoryChange 
}: CoachingFormAccordionProps) {
  // Student data with ages - now stateful
  const [students, setStudents] = React.useState<Student[]>([
    { id: 1, name: "Nick", age: "12th grade" },
    { id: 2, name: "Christopher", age: "8th grade" },
    { id: 3, name: "Sarah", age: "5th grade" }
  ]);

  // State for form values
  const [step, setStep] = React.useState(0); // 0, 1, 2
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]); // Track completed steps
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const [category, setCategory] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [note, setNote] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
  // Conditional data based on selected student
  const [availableCategories, setAvailableCategories] = React.useState<string[]>([]);
  const [availableTopics, setAvailableTopics] = React.useState<string[]>([]);

  // Update available categories when student selection changes
  React.useEffect(() => {
    if (selectedStudent) {
      const categories = getAvailableCategories(selectedStudent.age);
      setAvailableCategories(categories);
      
      // Reset category and topic selections if current ones are no longer available
      if (category && !categories.includes(category)) {
        setCategory("");
        setTopic("");
        setAvailableTopics([]);
      }
    } else {
      setAvailableCategories([]);
      setCategory("");
      setTopic("");
      setAvailableTopics([]);
    }
  }, [selectedStudent, category]);

  // Update available topics when category selection changes
  React.useEffect(() => {
    if (selectedStudent && category) {
      // Special handling for "Intro to College Coach"
      if (category === "Intro to College Coach") {
        setAvailableTopics(["Introduction to Your College Coach"]);
        setTopic("Introduction to Your College Coach");
      } else {
        const topics = getAvailableTopics(category, selectedStudent.age);
        setAvailableTopics(topics);
        
        // Reset topic selection if current one is no longer available
        if (topic && !topics.includes(topic)) {
          setTopic("");
        }
      }
    } else {
      setAvailableTopics([]);
      setTopic("");
    }
    
    // Notify parent component of category change
    if (onCategoryChange && category) {
      onCategoryChange(category);
    }
  }, [category, selectedStudent, topic, onCategoryChange]);

  // Notify parent of step changes
  React.useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  // Notify parent of completed steps changes
  React.useEffect(() => {
    onCompletedStepsChange?.(completedSteps);
  }, [completedSteps, onCompletedStepsChange]);

  // Add Student function
  const handleAddStudent = (newStudent: Student) => {
    setStudents(prev => [...prev, newStudent]);
    setSelectedStudent(newStudent);
  };

  // Validation per step
  function validateStep(idx: number) {
    if (idx === 0) {
      if (!selectedStudent) return "Please select a student.";
      if (!category) return "Please select a category.";
      // Additional validation for age-appropriate selections
      if (selectedStudent && category && category !== "Intro to College Coach" && !isCategoryAvailable(category, selectedStudent.age)) {
        return "Selected category is not available for this student's age.";
      }
    }
    if (idx === 1) {
      // For Intro to College Coach, we don't need topic validation since it's auto-set
      if (category === "Intro to College Coach") {
        // No validation needed for intro calls - they just need to proceed
        return "";
      }
      
      if (!topic) return "Please select a topic.";
      // Additional validation for age-appropriate topic
      if (selectedStudent && category && topic && !isTopicAvailable(category, topic, selectedStudent.age)) {
        return "Selected topic is not available for this student's age.";
      }
    }
    if (idx === 2) {
      if (!date || !time) return "Please select a date and time.";
      if (!phone) return "Please enter a phone number.";
    }
    return "";
  }

  function handleContinue(idx: number) {
    const err = validateStep(idx);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    
    // Special handling for step 0 (student/category selection)
    if (idx === 0) {
      // Mark step 0 as completed
      if (!completedSteps.includes(0)) {
        setCompletedSteps([...completedSteps, 0]);
      }
      
      // For all categories, go to step 1 (topic/focus area selection)
      setStep(1);
      return;
      
      // Remove step 1 (topic selection) from completed steps so it reopens as accordion
      // This ensures users can choose appropriate topics for the new student/category
      setCompletedSteps(prev => prev.filter(s => s !== 1));
      setStep(1);
      return;
    }
    
    // For other steps, use normal logic
    if (!completedSteps.includes(idx)) {
      setCompletedSteps([...completedSteps, idx]);
    }
    
    const nextStep = idx + 1;
    setStep(nextStep);
  }

  function handleEdit(stepIndex: number) {
    // Remove from completed steps and go back to that step
    setCompletedSteps(completedSteps.filter(s => s !== stepIndex));
    setStep(stepIndex);
    setError("");
  }

  function handleSubmit() {
    const err = validateStep(2);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    
    // Simulate form submission
    setIsSubmitted(true);
  }

  function resetForm() {
    setIsSubmitted(false);
    setStep(0);
    setCompletedSteps([]);
    setSelectedStudent(null);
    setCategory("");
    setTopic("");
    setNote("");
    setDate("");
    setTime("");
    setPhone("");
    setError("");
  }

  // Handle accordion value change
  function handleAccordionChange(value: string) {
    if (value) {
      const stepNum = parseInt(value.replace('step', ''));
      setStep(stepNum);
    }
  }

  // Show success screen if form is submitted
  if (isSubmitted) {
    return (
      <div className="w-full mx-auto font-sans">
        <SuccessScreen 
          selectedStudent={selectedStudent}
          category={category}
          topic={topic}
          date={date}
          time={time}
          phone={phone}
          onScheduleAnother={resetForm}
          onViewCalendar={() => {}} // Placeholder for view calendar action
        />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto font-sans">
      <Accordion.Root 
        type="single" 
        value={`step${step}`} 
        onValueChange={handleAccordionChange}
        collapsible 
        className="w-full"
      >
        {/* Step 1 - Show summary if completed, accordion if not */}
        {completedSteps.includes(0) ? (
          <Step1Summary 
            selectedStudent={selectedStudent}
            category={category}
            onEdit={() => handleEdit(0)}
          />
        ) : (
          <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 shadow-sm mb-3 lg:mb-4 transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in">
            <Accordion.Item value="step0" className="border-none">
              <Accordion.Header>
                <Accordion.Trigger className="w-full text-left font-semibold text-lg">
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-3 sm:px-6 lg:px-8 pt-1 pb-5 sm:pb-6 lg:pb-8 space-y-5 sm:space-y-6 lg:space-y-8 2xl:space-y-12 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                <div>
                  <div className="mb-3 lg:mb-4 font-medium text-lg text-gray-800">Choose a student <span className="text-red-500">*</span></div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                    {students.map((student, index) => (
                      <StudentCard
                        key={student.id}
                        student={student}
                        index={index}
                        isSelected={selectedStudent?.id === student.id}
                        onSelect={setSelectedStudent}
                      />
                    ))}
                  </div>
                  <AddStudentModal 
                    students={students}
                    onAddStudent={handleAddStudent}
                  />
                </div>
                
                <div>
                  <div className="mb-3 lg:mb-4 font-medium text-lg text-gray-800">Choose a topic <span className="text-red-500">*</span></div>
                  {!selectedStudent && (
                    <div className="p-3 lg:p-4 bg-gray-50 rounded-lg lg:rounded-xl border  text-center text-gray-700 text-sm">
                      Please select a student first to see available topics
                    </div>
                  )}
                  {selectedStudent && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                      {["Intro to College Coach", ...getAllCategories().filter(cat => cat !== "Intro to College Coach")].map((categoryName) => (
                        <CategoryCard
                          key={categoryName}
                          categoryName={categoryName}
                          selectedStudent={selectedStudent}
                          selectedCategory={category}
                          onSelect={setCategory}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
                <Button type="button" variant="default" size="lg" onClick={() => handleContinue(0)} className="w-full text-base lg:!text-lg bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-blue-800 rounded-lg lg:rounded-xl font-semibold px-4 lg:px-6 py-4 sm:py-5 lg:!py-8 touch-manipulation" style={{ minHeight: '52px' }}>Continue</Button>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        )}

        {/* Step 2 - Show summary if completed, accordion if step >= 1 and not completed */}
        {completedSteps.includes(1) ? (
          <Step2Summary 
            topic={topic}
            note={note}
            onEdit={() => handleEdit(1)}
            isIntroToCollegeCoach={category === "Intro to College Coach"}
          />
        ) : step >= 1 && (
          <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 shadow-sm mb-3 lg:mb-4 transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in">
            <Accordion.Item value="step1" className="border-none">
              <Accordion.Header>
                <Accordion.Trigger className="hidden">
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="p-4 sm:p-5 lg:p-6 space-y-4 lg:space-y-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                {category === "Intro to College Coach" ? (
                  // Special step 2 for Intro to College Coach - only note field
                  <div className="space-y-4 lg:space-y-6">
                    <div>
                      <label htmlFor="coach-note-intro" className="mb-3 lg:mb-4 font-medium text-lg lg:text-xl text-gray-900 block">Add a note to your coach (optional)</label>
                      <Textarea 
                        id="coach-note-intro"
                        value={note} 
                        onChange={e => setNote(e.target.value)} 
                        placeholder="Add any additional notes for your coach..." 
                        className="min-h-[80px] lg:min-h-[100px] rounded-lg lg:rounded-xl border-gray-200 text-sm" 
                        aria-describedby="coach-note-intro-description"
                      />
                      <div id="coach-note-intro-description" className="sr-only">Optional field for additional notes to your coach</div>
                    </div>
                  </div>
                ) : (
                                  <TopicSelector
                  category={category}
                  availableTopics={availableTopics}
                  selectedTopic={topic}
                  note={note}
                  onTopicChange={setTopic}
                  onNoteChange={setNote}
                  selectedStudent={selectedStudent || undefined}
                />
                )}
                {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
                <Button type="button" size="lg" onClick={() => handleContinue(1)} className="w-full text-base lg:!text-lg bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-blue-800 rounded-lg lg:rounded-xl font-semibold px-4 lg:px-6 py-4 sm:py-5 lg:!py-8 touch-manipulation" style={{ minHeight: '52px' }}>Continue</Button>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        )}

        {/* Step 3 - Only show if step >= 2 */}
        {step >= 2 && (
          <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-100 shadow-sm mb-3 lg:mb-4 transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in">
            <Accordion.Item value="step2" className="border-none">
              <Accordion.Header>
                <Accordion.Trigger className="hidden">
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="p-4 sm:p-5 lg:p-6 space-y-4 lg:space-y-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                <DateTimeSelector 
                  selectedDate={date} 
                  selectedTime={time} 
                  onDateChange={setDate} 
                  onTimeChange={setTime} 
                />
                <div>
                  <div className="mb-3 lg:mb-4 font-medium text-lg text-gray-900">Where should we call you? <span className="text-red-500">*</span></div>
                  <PhoneNumberSelector phone={phone} onPhoneChange={setPhone} />
                </div>
                <div>
                  <div className="mb-3 lg:mb-4 font-medium text-lg text-gray-900">Attach a document (optional)</div>
                  <Input type="file" className="rounded-lg lg:rounded-xl border-gray-200" />
                </div>
                {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
                <Button type="button" size="lg" onClick={handleSubmit} className="w-full text-base lg:!text-lg bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-blue-800 rounded-lg lg:rounded-xl font-semibold px-4 lg:px-6 py-4 sm:py-5 lg:!py-8 touch-manipulation" style={{ minHeight: '52px' }}>Schedule Appointment</Button>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        )}
      </Accordion.Root>
    </div>
  );
} 