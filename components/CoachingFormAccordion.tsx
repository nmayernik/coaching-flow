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
import { cn, existingStudentsFromOtherServices, ExistingStudent } from "@/lib/utils";
import { ExistingStudentCard } from "./CoachingFormAccordion/ExistingStudentCard";
import { useScenario } from "@/contexts/ScenarioContext";
import { getStudentsForScenario, getExistingStudentsForScenario, getTopicsForScenario, areDatesAvailableForScenario } from "@/lib/mockData";
import { Alert } from "@/components/ui/alert";
import { NoAppointmentsBanner } from "./CoachingFormAccordion/NoAppointmentsBanner";
import { NoCategoriesEmptyState } from "./CoachingFormAccordion/NoCategoriesEmptyState";
import { CoachContinuityBanner } from "./CoachingFormAccordion/CoachContinuityBanner";
import { CoachContinuityDialog } from "./CoachingFormAccordion/CoachContinuityDialog";
import { VideoCallsDialog } from "./CoachingFormAccordion/VideoCallsDialog";
import { getPreviousCoachForTopic } from "@/lib/mockData";

export default function CoachingFormAccordion({ 
  onStepChange, 
  onCompletedStepsChange,
  onCategoryChange 
}: CoachingFormAccordionProps) {
  const { currentScenario, coachContinuityEnabled, teamsCallsEnabled } = useScenario();
  
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
  const [attachedFileName, setAttachedFileName] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const setFileFromInput = (file: File | null) => {
    setAttachedFileName(file ? file.name : null);
    if (fileInputRef.current) {
      const dt = new DataTransfer();
      if (file) dt.items.add(file);
      fileInputRef.current.files = dt.files;
    }
  };
  const [error, setError] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [modalPrefillData, setModalPrefillData] = React.useState<{
    firstName: string;
    lastName: string;
    age: string;
  } | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [usePreviousCoach, setUsePreviousCoach] = React.useState(false);
  const [isCoachDialogOpen, setIsCoachDialogOpen] = React.useState(false);
  const [isVideoCallsDialogOpen, setIsVideoCallsDialogOpen] = React.useState(false);
  
  // Get scenario-aware data
  const baseStudents = getStudentsForScenario(currentScenario);
  const existingStudents = getExistingStudentsForScenario(currentScenario);
  const [addedStudents, setAddedStudents] = React.useState<Student[]>([]);
  const [removedExistingStudents, setRemovedExistingStudents] = React.useState<string[]>([]);
  
  // Combine base students with added students
  const students = [...baseStudents, ...addedStudents];
  
  // Filter out removed existing students
  const filteredExistingStudents = existingStudents.filter(existing => {
    const existingName = `${existing.firstName} ${existing.lastName}`;
    return !removedExistingStudents.includes(existingName);
  });
  
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
      // Use scenario-aware topics
      const scenarioTopics = getTopicsForScenario(currentScenario, category, selectedStudent.age);
      
      if (scenarioTopics.length > 0) {
        // Use scenario-specific topics
        setAvailableTopics(scenarioTopics);
        // Reset topic selection if current one is no longer available
        if (topic && !scenarioTopics.includes(topic)) {
          setTopic("");
        }
      } else if (category === "Intro to College Coach" && currentScenario !== "no-topics-available") {
        // Special handling for "Intro to College Coach" when no scenario topics (except no-topics scenario)
        setAvailableTopics(["Introduction to Your College Coach"]);
        setTopic("Introduction to Your College Coach");
      } else if (currentScenario !== "no-topics-available") {
        // Fall back to regular topic logic (except in no-topics scenario)
        const topics = getAvailableTopics(category, selectedStudent.age);
        setAvailableTopics(topics);
        
        // For prototype: Auto-select first topic if none selected
        if (topics.length > 0 && !topic) {
          setTopic(topics[0]);
        } else if (topic && !topics.includes(topic)) {
          // Reset topic selection if current one is no longer available
          setTopic(topics.length > 0 ? topics[0] : "");
        }
      } else {
        // In no-topics scenario, ensure no topics are available
        setAvailableTopics([]);
        setTopic("");
      }
    } else {
      setAvailableTopics([]);
      setTopic("");
    }
    
    // Reset coach selection when student, category, or topic changes
    setUsePreviousCoach(false);
    
    // Notify parent component of category change
    if (onCategoryChange && category) {
      onCategoryChange(category);
    }
  }, [category, selectedStudent, topic, onCategoryChange, currentScenario]);

  // Notify parent of step changes
  React.useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  // Notify parent of completed steps changes
  React.useEffect(() => {
    onCompletedStepsChange?.(completedSteps);
  }, [completedSteps, onCompletedStepsChange]);

  // Get previous coach for current student and topic
  const previousCoach = React.useMemo(() => {
    if (selectedStudent && topic) {
      return getPreviousCoachForTopic(selectedStudent.id, topic);
    }
    return null;
  }, [selectedStudent, topic]);

  // Add Student function
  const handleAddStudent = (newStudent: Student) => {
    // Add sessionsAvailable property to the new student
    const studentWithSessions: Student = {
      ...newStudent,
      sessionsAvailable: 3 // Default to 3 sessions for added students
    };
    
    // Add to the added students list
    setAddedStudents(prev => [...prev, studentWithSessions]);
    
    // Select the newly added student
    setSelectedStudent(studentWithSessions);
    
    // Remove from existing students list if it was an existing student
    const existingStudentName = `${newStudent.name}`;
    const updatedExistingStudents = existingStudents.filter(existing => 
      `${existing.firstName} ${existing.lastName}` !== existingStudentName
    );
    
    // Add to removed existing students list
    setRemovedExistingStudents(prev => [...prev, existingStudentName]);
  };

  // Add existing student from other services
  const handleAddExistingStudent = (existingStudent: ExistingStudent) => {
    // Set prefill data for the modal
    setModalPrefillData({
      firstName: existingStudent.firstName,
      lastName: existingStudent.lastName,
      age: "" // User needs to fill this out
    });
    // Open the modal
    setIsModalOpen(true);
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
      
      // For prototype: Skip topic validation to allow testing date/time step
      // Auto-select first available topic if none selected
      if (!topic && availableTopics.length > 0) {
        setTopic(availableTopics[0]);
        return "";
      }
      
      // Skip age validation for prototype
      // if (!topic) return "Please select a topic.";
      // if (selectedStudent && category && topic && !isTopicAvailable(category, topic, selectedStudent.age)) {
      //   return "Selected topic is not available for this student's age.";
      // }
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
    setAddedStudents([]);
    setRemovedExistingStudents([]);
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
          teamsCallsMode={teamsCallsEnabled}
          coachContinuityEnabled={coachContinuityEnabled}
          meetingWithPreviousCoach={usePreviousCoach}
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
          <div className="relative z-10 pointer-events-auto lg:bg-white lg:rounded-2xl lg:border lg:border-gray-100 lg:shadow-sm mb-3 lg:mb-4 transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in">
            <Accordion.Item value="step0" className="border-none">
              <Accordion.Header>
                <Accordion.Trigger className="hidden md:show w-full text-left font-semibold text-lg">
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="lg:px-8 pt-1 lg:pt-6 pb-5 sm:pb-6 lg:pb-8 space-y-5 sm:space-y-6 lg:space-y-8 2xl:space-y-12 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                {error && <Alert variant="destructive" className="mb-4 text-sm">{error}</Alert>}
                {currentScenario === "no-appointments" && <NoAppointmentsBanner />}
                <div>
                  <div className="mb-3 lg:mb-4 font-medium text-lg text-gray-800">Choose a student <span className="text-red-500">*</span></div>
                  
                  {/* All Students */}
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
                    
                    {filteredExistingStudents.map((existingStudent) => (
                      <ExistingStudentCard
                        key={existingStudent.id}
                        existingStudent={existingStudent}
                        onAdd={handleAddExistingStudent}
                      />
                    ))}
                  </div>

                  <AddStudentModal 
                    students={students}
                    onAddStudent={(student) => {
                      handleAddStudent(student);
                      setModalPrefillData(undefined);
                      setIsModalOpen(false);
                    }}
                    prefillData={modalPrefillData}
                    isOpen={isModalOpen}
                    onOpenChange={setIsModalOpen}
                  />
                </div>
                
                <div>
                  <div className="mb-3 lg:mb-4 font-medium text-lg text-gray-800">Choose a topic <span className="text-red-500">*</span></div>
                  {!selectedStudent && (
                    <div className="p-3 lg:p-4 bg-gray-50 rounded-lg lg:rounded-xl border  text-center text-gray-700 text-sm">
                      Please select a student first to see available topics
                    </div>
                  )}
                  {selectedStudent && currentScenario === "no-topics-available" ? (
                    <NoCategoriesEmptyState studentName={selectedStudent.name} />
                  ) : selectedStudent && (
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
                
                <Button 
                  type="button" 
                  variant="primary" 
                  size="lg" 
                  onClick={() => handleContinue(0)} 
                  disabled={
                    (currentScenario === "no-appointments" && students.every(student => student.sessionsAvailable === 0)) ||
                    (currentScenario === "no-topics-available" && !!selectedStudent)
                  }
                  className="w-full text-base lg:!text-lg bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-blue-800 rounded-lg lg:rounded-xl font-semibold px-4 lg:px-6 py-4 sm:py-5 lg:!py-8 touch-manipulation" 
                  style={{ minHeight: '52px' }}
                >
                  Continue
                </Button>
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
          <div className="lg:bg-white lg:rounded-2xl lg:border lg:border-gray-100 lg:shadow-sm mb-3 lg:mb-4 transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in">
            <Accordion.Item value="step1" className="border-none">
              <Accordion.Header>
                <Accordion.Trigger className="hidden">
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="lg:p-6 space-y-4 lg:space-y-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                {error && <Alert variant="destructive" className="mb-4 text-sm">{error}</Alert>}
                {currentScenario === "no-appointments" && students.every(student => student.sessionsAvailable === 0) && (
                  <Alert variant="destructive" className="mb-4 text-sm">
                    All students have 0 sessions remaining. Please contact support to add more sessions.
                  </Alert>
                )}
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
                    studentName={selectedStudent?.name}
                    onTopicChange={setTopic}
                    onNoteChange={setNote}
                    selectedStudent={selectedStudent || undefined}
                  />
                )}
                <Button type="button" size="lg" onClick={() => handleContinue(1)} className="w-full text-base lg:!text-lg bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-blue-800 rounded-lg lg:rounded-xl font-semibold px-4 lg:px-6 py-4 sm:py-5 lg:!py-8 touch-manipulation" style={{ minHeight: '52px' }}>Continue</Button>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        )}

        {/* Step 3 - Only show if step >= 2 */}
        {step >= 2 && (
          <div className="lg:bg-white lg:rounded-2xl lg:border lg:border-gray-100 lg:shadow-sm mb-3 lg:mb-4 transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in">
            <Accordion.Item value="step2" className="border-none">
              <Accordion.Header>
                <Accordion.Trigger className="hidden">
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="lg:p-6 space-y-4 lg:space-y-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                {error && <Alert variant="destructive" className="mb-4 text-sm">{error}</Alert>}
                
                {/* Coach Continuity Banner - only when Coach Continuity is enabled */}
                {coachContinuityEnabled && previousCoach && (
                  <CoachContinuityBanner
                    previousCoach={previousCoach}
                    isPreviousCoachSelected={usePreviousCoach}
                    onToggle={() => setUsePreviousCoach(!usePreviousCoach)}
                    onMoreDetails={() => setIsCoachDialogOpen(true)}
                  />
                )}

                <DateTimeSelector
                  selectedDate={date}
                  selectedTime={time}
                  onDateChange={setDate}
                  onTimeChange={setTime}
                  selectedCoachId={coachContinuityEnabled && usePreviousCoach ? previousCoach?.coachId ?? null : null}
                />
                <div>
                  <div className={cn("font-medium text-base text-gray-800", teamsCallsEnabled ? "mt-0.5 mb-0.5" : "mb-3")}>
                    {teamsCallsEnabled
                      ? "Where should we call you if we run into issues connecting? "
                      : "Where should we call you? "}
                    <span className="text-red-500">*</span>
                  </div>
                  <PhoneNumberSelector
                    phone={phone}
                    onPhoneChange={setPhone}
                    teamsCallsMode={teamsCallsEnabled}
                    onLearnMore={teamsCallsEnabled ? () => setIsVideoCallsDialogOpen(true) : undefined}
                  />
                </div>
                <div>
                  <div className="mb-3 font-medium text-base text-gray-800">Attach a document (optional)</div>
                  <div
                    className={cn(
                      "flex min-h-[150px] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-white text-gray-800 transition-colors",
                      "border-gray-300 lg:rounded-xl",
                      isDragging && "border-blue-400 bg-blue-25",
                      "focus-within:outline-none focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
                    )}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDragging(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDragging(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDragging(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) setFileFromInput(file);
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                      aria-label="Attach a document"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        setFileFromInput(file ?? null);
                      }}
                    />
                    {attachedFileName ? (
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-base font-medium text-gray-800">{attachedFileName}</p>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="rounded-lg border-gray-300 bg-white text-blue-700 hover:bg-blue-25 hover:border-gray-300"
                        >
                          Browse files
                        </Button>
                      </div>
                    ) : (
                      <>
                        <p className="text-base text-gray-700">Drag file to upload or</p>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="rounded-lg border-gray-300 bg-white text-blue-700 hover:bg-blue-25 hover:border-gray-300"
                        >
                          Browse files
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <Button type="button" size="lg" onClick={handleSubmit} className="w-full text-base lg:!text-lg bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-blue-800 rounded-lg lg:rounded-xl font-semibold px-4 lg:px-6 py-4 sm:py-5 lg:!py-8 touch-manipulation" style={{ minHeight: '52px' }}>Schedule Appointment</Button>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        )}
      </Accordion.Root>
      
      {/* Coach Continuity Dialog - only when Coach Continuity is enabled */}
      {coachContinuityEnabled && (
        <CoachContinuityDialog
          isOpen={isCoachDialogOpen}
          onOpenChange={setIsCoachDialogOpen}
        />
      )}
      {/* Video Calls (Teams) Dialog - only when Teams calls is enabled */}
      {teamsCallsEnabled && (
        <VideoCallsDialog
          isOpen={isVideoCallsDialogOpen}
          onOpenChange={setIsVideoCallsDialogOpen}
        />
      )}
    </div>
  );
} 