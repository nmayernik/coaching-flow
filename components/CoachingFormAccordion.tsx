"use client";

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getAvailableCategories,
  getAvailableTopics,
  isCategoryAvailable,
  isTopicAvailable,
  getAllCategories,
} from "../lib/topicLogicData";

// Extracted components
import { AttachmentUpload } from "./CoachingFormAccordion/AttachmentUpload";
import {
  BOOKING_POLICY,
  isAvailableSelection,
  parseLocalDate,
} from "@/lib/booking";
import { DateTimeSelector } from "./CoachingFormAccordion/DateTimeSelector";
import { PhoneNumberSelector } from "./CoachingFormAccordion/PhoneNumberSelector";
import { AddStudentModal } from "./CoachingFormAccordion/AddStudentModal";
import { StudentCard } from "./CoachingFormAccordion/StudentCard";
import { CategoryCard } from "./CoachingFormAccordion/CategoryCard";
import { TopicSelector } from "./CoachingFormAccordion/TopicSelector";
import {
  Step1Summary,
  Step2Summary,
  SuccessScreen,
  AppointmentDetails,
  RescheduleNotice,
  SuccessScreenProps,
} from "./CoachingFormAccordion/SummaryComponents";
import {
  Student,
  CoachingFormAccordionProps,
} from "./CoachingFormAccordion/types";
import {
  cn,
  existingStudentsFromOtherServices,
  ExistingStudent,
} from "@/lib/utils";
import { ExistingStudentCard } from "./CoachingFormAccordion/ExistingStudentCard";
import { useScenario } from "@/contexts/ScenarioContext";
import {
  getStudentsForScenario,
  getExistingStudentsForScenario,
  getTopicsForScenario,
  areDatesAvailableForScenario,
} from "@/lib/mockData";
import { Alert } from "@/components/ui/alert";
import { NoAppointmentsBanner } from "./CoachingFormAccordion/NoAppointmentsBanner";
import { NoCategoriesEmptyState } from "./CoachingFormAccordion/NoCategoriesEmptyState";
import { CoachAvailabilityDropdown } from "./CoachingFormAccordion/CoachAvailabilityDropdown";
import { CoachContinuityLine } from "./CoachingFormAccordion/CoachContinuityLine";
import { CoachContinuityDialog } from "./CoachingFormAccordion/CoachContinuityDialog";
import { VideoCallsDialog } from "./CoachingFormAccordion/VideoCallsDialog";
import {
  getPreviousCoachForTopic,
  getCoachAvailableDates,
  getCoachAvailableTimesForDate,
} from "@/lib/mockData";
import {
  ONE_BH_TOPICS,
  getSubtopicsForOneBhTopic,
} from "@/lib/scenarios/oneBhTopics";

export default function CoachingFormAccordion({
  onStepChange,
  onCompletedStepsChange,
  onCategoryChange,
}: CoachingFormAccordionProps) {
  const {
    currentScenario,
    coachContinuityEnabled,
    coachRoleLabels,
    teamsCallsEnabled,
  } = useScenario();
  const searchParams = useSearchParams();

  // State for form values
  const [step, setStep] = React.useState(0); // 0, 1, 2
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]); // Track completed steps
  const [focusTarget, setFocusTarget] = React.useState<
    "myself" | "dependent" | null
  >(null); // Big C Coaching only
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(
    null,
  );
  const [category, setCategory] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [note, setNote] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [phoneOption, setPhoneOption] = React.useState("");
  const [view, setView] = React.useState<"confirmation" | "management">(
    "confirmation",
  );
  const [isRescheduling, setIsRescheduling] = React.useState(false);
  const [bookedAppointment, setBookedAppointment] = React.useState<
    | (Omit<SuccessScreenProps, "onScheduleAnother" | "onViewCalendar"> & {
        note: string;
        phoneOption: string;
        attachedFileName: string | null;
      })
    | null
  >(null);
  const [attachedFileName, setAttachedFileName] = React.useState<string | null>(
    null,
  );
  const [error, setError] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [modalPrefillData, setModalPrefillData] = React.useState<
    | {
        firstName: string;
        lastName: string;
        age: string;
      }
    | undefined
  >(undefined);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [usePreviousCoach, setUsePreviousCoach] = React.useState(false);
  const [isCoachDialogOpen, setIsCoachDialogOpen] = React.useState(false);
  const [isVideoCallsDialogOpen, setIsVideoCallsDialogOpen] =
    React.useState(false);
  const hasAppliedDeepLink = React.useRef(false);

  const previousSelectionContext = React.useRef("");

  // Get scenario-aware data
  const baseStudents = getStudentsForScenario(currentScenario);
  const existingStudents = getExistingStudentsForScenario(currentScenario);
  const [addedStudents, setAddedStudents] = React.useState<Student[]>([]);
  const [removedExistingStudents, setRemovedExistingStudents] = React.useState<
    string[]
  >([]);

  // Combine base students with added students
  const students = [...baseStudents, ...addedStudents];

  React.useEffect(() => {
    if (hasAppliedDeepLink.current) {
      return;
    }

    const shouldStartAtContinuity =
      ["continuity", "teams", "step3"].includes(
        searchParams.get("startAt") ?? "",
      ) || searchParams.get("step") === "3";
    if (!shouldStartAtContinuity) {
      return;
    }

    const defaultStudent =
      students.find((student) => student.id === 1) ?? students[0];
    if (!defaultStudent) {
      return;
    }

    hasAppliedDeepLink.current = true;
    setSelectedStudent(defaultStudent);
    setCategory("College Admissions");
    setTopic("Preparing College Applications");
    setNote(
      "During this session, I'm hoping to discuss how to best showcase my student's strengths and experiences in their college application. I would also appreciate guidance on writing a great essay and understanding the application process.",
    );
    setStep(2);
    setCompletedSteps([0, 1]);
    setUsePreviousCoach(searchParams.get("coachSelection") === "previous");
  }, [searchParams, students]);

  // Filter out removed existing students
  const filteredExistingStudents = existingStudents.filter((existing) => {
    const existingName = `${existing.firstName} ${existing.lastName}`;
    return !removedExistingStudents.includes(existingName);
  });

  // Conditional data based on selected student
  const [availableCategories, setAvailableCategories] = React.useState<
    string[]
  >([]);
  const [availableTopics, setAvailableTopics] = React.useState<string[]>([]);

  // Update available categories when student selection changes
  React.useEffect(() => {
    if (currentScenario === "big-c-coaching") {
      // Big C: topic list is ONE_BH_TOPICS, not driven by student; don't clear category/topic when student is null (Myself)
      if (selectedStudent) {
        const categories = getAvailableCategories(selectedStudent.age);
        setAvailableCategories(categories);
      } else {
        setAvailableCategories([]);
      }
      return;
    }
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
      if (!hasAppliedDeepLink.current) {
        setCategory("");
        setTopic("");
        setAvailableTopics([]);
      }
    }
  }, [selectedStudent, category, currentScenario]);

  // Update available topics when category selection changes
  React.useEffect(() => {
    if (currentScenario === "big-c-coaching" && category) {
      const subtopics = getSubtopicsForOneBhTopic(category);
      setAvailableTopics(subtopics);
      if (topic && !subtopics.includes(topic)) {
        setTopic("");
      }
      setUsePreviousCoach(false);
      if (onCategoryChange && category) {
        onCategoryChange(category);
      }
      return;
    }

    if (selectedStudent && category) {
      // Use scenario-aware topics
      const scenarioTopics = getTopicsForScenario(
        currentScenario,
        category,
        selectedStudent.age,
      );

      if (scenarioTopics.length > 0) {
        // Use scenario-specific topics
        setAvailableTopics(scenarioTopics);
        // Reset topic selection if current one is no longer available
        if (topic && !scenarioTopics.includes(topic)) {
          setTopic("");
        }
      } else if (
        category === "Intro to College Coach" &&
        currentScenario !== "no-topics-available"
      ) {
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
      if (!hasAppliedDeepLink.current) {
        setTopic("");
      }
    }

    // Notify parent component of category change
    if (onCategoryChange && category) {
      onCategoryChange(category);
    }
  }, [
    category,
    selectedStudent,
    topic,
    onCategoryChange,
    currentScenario,
    searchParams,
  ]);

  React.useEffect(() => {
    if (!selectedStudent || !category || !topic) return;
    const key = `${selectedStudent.id}:${category}:${topic}`;
    if (
      previousSelectionContext.current &&
      previousSelectionContext.current !== key
    ) {
      setUsePreviousCoach(false);
      setTime("");
    }
    previousSelectionContext.current = key;
  }, [selectedStudent, category, topic]);

  // Notify parent of step changes
  React.useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  // Notify parent of completed steps changes
  React.useEffect(() => {
    onCompletedStepsChange?.(completedSteps);
  }, [completedSteps, onCompletedStepsChange]);

  React.useEffect(() => {
    if (!isSubmitted) return;
    const main = document.querySelector("main");
    if (main && getComputedStyle(main).overflowY === "auto")
      main.scrollTo({ top: 0 });
    else window.scrollTo({ top: 0 });
  }, [isSubmitted, view]);

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
      sessionsAvailable: 3, // Default to 3 sessions for added students
    };

    // Add to the added students list
    setAddedStudents((prev) => [...prev, studentWithSessions]);

    // Select the newly added student
    setSelectedStudent(studentWithSessions);

    // Remove from existing students list if it was an existing student
    const existingStudentName = `${newStudent.name}`;
    const updatedExistingStudents = existingStudents.filter(
      (existing) =>
        `${existing.firstName} ${existing.lastName}` !== existingStudentName,
    );

    // Add to removed existing students list
    setRemovedExistingStudents((prev) => [...prev, existingStudentName]);
  };

  // Add existing student from other services
  const handleAddExistingStudent = (existingStudent: ExistingStudent) => {
    // Set prefill data for the modal
    setModalPrefillData({
      firstName: existingStudent.firstName,
      lastName: existingStudent.lastName,
      age: "", // User needs to fill this out
    });
    // Open the modal
    setIsModalOpen(true);
  };

  // Validation per step
  function validateStep(idx: number) {
    if (idx === 0) {
      if (currentScenario === "big-c-coaching") {
        if (!focusTarget)
          return "Please select who will be the focus of your coaching session.";
        if (focusTarget === "dependent" && !selectedStudent)
          return "Please select a dependent.";
        if (!category) return "Please select a topic.";
        return "";
      }
      if (!selectedStudent) return "Please select a student.";
      if (!category) return "Please select a category.";
      // Additional validation for age-appropriate selections
      if (
        selectedStudent &&
        category &&
        category !== "Intro to College Coach" &&
        !isCategoryAvailable(category, selectedStudent.age)
      ) {
        return "Selected category is not available for this student's age.";
      }
    }
    if (idx === 1) {
      // Big C Coaching: require subtopic when we have subtopics
      if (
        currentScenario === "big-c-coaching" &&
        availableTopics.length > 0 &&
        !topic
      ) {
        return "Please select a focus area.";
      }
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
      const coachId =
        coachContinuityEnabled && usePreviousCoach
          ? (previousCoach?.coachId ?? null)
          : null;
      if (
        !isAvailableSelection(
          date,
          time,
          getCoachAvailableDates(coachId),
          getCoachAvailableTimesForDate(coachId, parseLocalDate(date)),
        )
      )
        return "That time is no longer available. Please select an available date and time.";
      if (!phone || phone.replace(/\D/g, "").length !== 10)
        return "Please enter a 10-digit phone number.";
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
    setCompletedSteps(completedSteps.filter((s) => s !== stepIndex));
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

    setBookedAppointment({
      selectedStudent,
      category,
      topic,
      date,
      time,
      phone,
      note,
      phoneOption,
      attachedFileName,
      bookingId:
        isRescheduling && bookedAppointment
          ? bookedAppointment.bookingId
          : crypto.randomUUID(),
      teamsCallsMode: teamsCallsEnabled,
      coachContinuityEnabled,
      meetingWithPreviousCoach: coachContinuityEnabled && usePreviousCoach,
      previousCoachName: usePreviousCoach
        ? previousCoach?.coachName
        : undefined,
      coachRoleLabels,
      focusTarget:
        currentScenario === "big-c-coaching" ? focusTarget : undefined,
      isRescheduled: isRescheduling,
    });
    setIsRescheduling(false);
    setView("confirmation");
    setCompletedSteps([0, 1, 2]);
    setIsSubmitted(true);
  }

  function resetForm() {
    setIsSubmitted(false);
    setStep(0);
    setCompletedSteps([]);
    setFocusTarget(null);
    setSelectedStudent(null);
    setCategory("");
    setTopic("");
    setNote("");
    setDate("");
    setTime("");
    setPhone("");
    setPhoneOption("");
    setUsePreviousCoach(false);
    setAttachedFileName(null);
    setIsRescheduling(false);
    setView("confirmation");
    setError("");
    setAddedStudents([]);
    setRemovedExistingStudents([]);
  }

  // Handle accordion value change
  function handleAccordionChange(value: string) {
    if (value) {
      const stepNum = parseInt(value.replace("step", ""));
      setStep(stepNum);
    }
  }

  const startRescheduling = () => {
    setIsSubmitted(false);
    setIsRescheduling(true);
    setCompletedSteps([0, 1]);
    setStep(2);
    setTime("");
    setError("");
  };

  if (isSubmitted && bookedAppointment) {
    if (view === "management")
      return (
        <section
          className="space-y-8 rounded-xl border border-gray-100 bg-white p-4 md:rounded-2xl md:p-8"
          aria-label="Manage appointments"
        >
          <div>
            <h2 className="text-2xl font-semibold leading-8 text-gray-800">
              My Calendar
            </h2>
            <p className="mt-2 text-base text-gray-700">
              Your upcoming coaching session
            </p>
          </div>
          <AppointmentDetails
            {...bookedAppointment}
            onViewCalendar={() => setView("management")}
          />
          <RescheduleNotice />
          <div className="flex flex-col gap-3 md:flex-row">
            <Button
              variant="secondary"
              size="2xl"
              className="flex-1"
              onClick={() => setView("confirmation")}
            >
              Back to confirmation
            </Button>
            <Button size="2xl" className="flex-1" onClick={startRescheduling}>
              Reschedule session
            </Button>
          </div>
        </section>
      );
    return (
      <SuccessScreen
        {...bookedAppointment}
        onScheduleAnother={resetForm}
        onViewCalendar={() => setView("management")}
      />
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
            focusTarget={
              currentScenario === "big-c-coaching" ? focusTarget : undefined
            }
          />
        ) : (
          <div className="relative z-10 pointer-events-auto lg:bg-white lg:rounded-2xl lg:border lg:border-gray-100 lg:shadow-sm mb-3 lg:mb-4 transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-4 fade-in">
            <Accordion.Item value="step0" className="border-none">
              <Accordion.Header asChild>
                <h2 className="sr-only">
                  <Accordion.Trigger tabIndex={-1}>
                    Student and topic
                  </Accordion.Trigger>
                </h2>
              </Accordion.Header>
              <Accordion.Content className="lg:px-8 pt-1 lg:pt-6 pb-5 sm:pb-6 lg:pb-8 space-y-5 sm:space-y-6 lg:space-y-8 2xl:space-y-12 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                {error && (
                  <Alert
                    variant="destructive"
                    role="alert"
                    className="mb-4 text-sm"
                  >
                    {error}
                  </Alert>
                )}
                {currentScenario === "no-appointments" && (
                  <NoAppointmentsBanner />
                )}

                {currentScenario === "big-c-coaching" ? (
                  <>
                    <div>
                      <div className="mb-3 lg:mb-4 font-medium text-lg text-gray-800">
                        Who will be the focus of your coaching session?{" "}
                        <span className="text-red-500">*</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                        <button
                          type="button"
                          onClick={() => setFocusTarget("myself")}
                          className={cn(
                            "p-3 sm:p-4 lg:p-4 rounded-2xl lg:rounded-xl border text-left transition-colors duration-200 ease-out",
                            focusTarget === "myself"
                              ? "ring-blue-700 ring-2 border-white bg-blue-50 hover:bg-blue-25"
                              : "border-gray-400 hover:bg-gray-50",
                          )}
                        >
                          <span className="font-medium text-base text-gray-800">
                            Myself
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFocusTarget("dependent")}
                          className={cn(
                            "p-3 sm:p-4 lg:p-4 rounded-2xl lg:rounded-xl border text-left transition-colors duration-200 ease-out",
                            focusTarget === "dependent"
                              ? "ring-blue-700 ring-2 border-white bg-blue-50 hover:bg-blue-25"
                              : "border-gray-400 hover:bg-gray-50",
                          )}
                        >
                          <span className="font-medium text-base text-gray-800">
                            Dependent
                          </span>
                        </button>
                      </div>
                    </div>

                    {focusTarget === "dependent" && (
                      <div>
                        <div className="mb-3 lg:mb-4 font-medium text-lg text-gray-800">
                          Choose a dependent{" "}
                          <span className="text-red-500">*</span>
                        </div>
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
                          showAddStudentTrigger
                          useDependentLabels
                        />
                      </div>
                    )}

                    <div className="pr-2 sm:pr-3">
                      <div className="mb-3 lg:mb-4 font-medium text-lg text-gray-800">
                        Choose a topic <span className="text-red-500">*</span>
                      </div>
                      {focusTarget === "myself" ||
                      (focusTarget === "dependent" && selectedStudent) ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 p-[2px]">
                          {ONE_BH_TOPICS.map((categoryName) => (
                            <CategoryCard
                              key={categoryName}
                              categoryName={categoryName}
                              selectedStudent={null}
                              selectedCategory={category}
                              onSelect={setCategory}
                              forceAvailable
                              hideDescription
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="p-3 lg:p-4 bg-gray-50 rounded-lg lg:rounded-xl border text-center text-gray-700 text-sm">
                          Select a person to view topics
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="mb-3 lg:mb-4 font-medium text-lg text-gray-800">
                        Choose a student <span className="text-red-500">*</span>
                      </div>

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
                        showAddStudentTrigger={
                          currentScenario === "with-existing-students"
                        }
                      />
                    </div>

                    <div className="pr-2 sm:pr-3">
                      <div className="mb-3 lg:mb-4 font-medium text-lg text-gray-800">
                        Choose a topic <span className="text-red-500">*</span>
                      </div>
                      {selectedStudent &&
                      currentScenario === "no-topics-available" ? (
                        <NoCategoriesEmptyState
                          studentName={selectedStudent.name}
                        />
                      ) : (
                        <div>
                          {!selectedStudent && (
                            <div className="p-3 lg:p-4 bg-gray-50 rounded-lg lg:rounded-xl border text-center text-gray-700 text-sm">
                              Select a student to see available topics
                            </div>
                          )}

                          <div
                            className={cn(
                              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 p-[2px] overflow-x-visible overflow-y-hidden transition-[max-height,opacity] duration-300 ease-out",
                              selectedStudent
                                ? "max-h-[1000px] opacity-100"
                                : "max-h-0 opacity-0 pointer-events-none",
                            )}
                            aria-hidden={!selectedStudent}
                          >
                            {(currentScenario === "hide-intro-after-call"
                              ? getAllCategories().filter(
                                  (cat) => cat !== "Intro to College Coach",
                                )
                              : [
                                  "Intro to College Coach",
                                  ...getAllCategories().filter(
                                    (cat) => cat !== "Intro to College Coach",
                                  ),
                                ]
                            ).map((categoryName) => (
                              <CategoryCard
                                key={categoryName}
                                categoryName={categoryName}
                                selectedStudent={selectedStudent}
                                selectedCategory={category}
                                onSelect={setCategory}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={() => handleContinue(0)}
                  disabled={
                    (currentScenario === "no-appointments" &&
                      students.every(
                        (student) => student.sessionsAvailable === 0,
                      )) ||
                    (currentScenario === "no-topics-available" &&
                      !!selectedStudent) ||
                    (currentScenario === "big-c-coaching" &&
                      (!focusTarget ||
                        (focusTarget === "dependent" && !selectedStudent) ||
                        !category))
                  }
                  className="w-full text-base lg:!text-lg bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-blue-800 rounded-lg lg:rounded-xl font-semibold px-4 lg:px-6 py-4 sm:py-5 lg:!py-8 touch-manipulation"
                  style={{ minHeight: "52px" }}
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
        ) : (
          step >= 1 && (
            <div className="rounded-xl border border-gray-100 bg-white md:rounded-2xl">
              <Accordion.Item value="step1" className="border-none">
                <Accordion.Header asChild>
                  <h2 className="sr-only">
                    <Accordion.Trigger tabIndex={-1}>
                      Focus area
                    </Accordion.Trigger>
                  </h2>
                </Accordion.Header>
                <Accordion.Content className="p-4 md:p-8 space-y-8 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                  {error && (
                    <Alert
                      variant="destructive"
                      role="alert"
                      className="mb-4 text-sm"
                    >
                      {error}
                    </Alert>
                  )}
                  {currentScenario === "no-appointments" &&
                    students.every(
                      (student) => student.sessionsAvailable === 0,
                    ) && (
                      <Alert
                        variant="destructive"
                        role="alert"
                        className="mb-4 text-sm"
                      >
                        All students have 0 sessions remaining. Please contact
                        support to add more sessions.
                      </Alert>
                    )}
                  {category === "Intro to College Coach" ? (
                    // Special step 2 for Intro to College Coach - only note field
                    <div className="space-y-4 lg:space-y-6">
                      <div>
                        <label
                          htmlFor="coach-note-intro"
                          className="mb-3 lg:mb-4 font-medium text-lg lg:text-xl text-gray-900 block"
                        >
                          Add a note for us{" "}
                          <span className="text-gray-500 font-normal">
                            (optional)
                          </span>
                        </label>
                        <Textarea
                          id="coach-note-intro"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder=""
                          className="min-h-[80px] lg:min-h-[100px] rounded-lg lg:rounded-xl border-gray-200 text-sm"
                          aria-describedby="coach-note-intro-description"
                        />
                        <div
                          id="coach-note-intro-description"
                          className="sr-only"
                        >
                          Optional field for additional notes to your{" "}
                          {coachRoleLabels.singular}
                        </div>
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
                      coachRoleLabels={coachRoleLabels}
                    />
                  )}
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => handleContinue(1)}
                    className="w-full text-base lg:!text-lg bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-blue-800 rounded-lg lg:rounded-xl font-semibold px-4 lg:px-6 py-4 sm:py-5 lg:!py-8 touch-manipulation"
                    style={{ minHeight: "52px" }}
                  >
                    Continue
                  </Button>
                </Accordion.Content>
              </Accordion.Item>
            </div>
          )
        )}

        {/* Step 3 - Only show if step >= 2 */}
        {step >= 2 && (
          <div className="rounded-xl border border-gray-100 bg-white md:rounded-2xl">
            <Accordion.Item value="step2" className="border-none">
              <Accordion.Header asChild>
                <h2 className="sr-only">
                  <Accordion.Trigger tabIndex={-1}>
                    Date and time
                  </Accordion.Trigger>
                </h2>
              </Accordion.Header>
              <Accordion.Content className="p-4 md:p-8 space-y-8 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                {error && (
                  <Alert
                    variant="destructive"
                    role="alert"
                    className="mb-4 text-sm"
                  >
                    {error}
                  </Alert>
                )}

                {isRescheduling && (
                  <div className="space-y-1.5">
                    <label
                      htmlFor="reschedule-note"
                      className="text-base font-medium leading-7 text-gray-800"
                    >
                      Add a note to your {coachRoleLabels.singular} (optional)
                    </label>
                    <Textarea
                      id="reschedule-note"
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                      className="min-h-[72px] rounded-lg border-gray-400"
                    />
                  </div>
                )}
                <div className="space-y-3">
                  {coachContinuityEnabled && previousCoach ? (
                    <>
                      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                        <span className="font-medium text-base text-gray-800">
                          Choose a date and time{" "}
                          <span className="text-red-500">*</span>
                        </span>
                        <span className="flex min-w-0 items-center gap-1 text-sm text-gray-800">
                          <span className="shrink-0">
                            Showing availability for
                          </span>
                          <CoachAvailabilityDropdown
                            value={usePreviousCoach ? "previous" : "all"}
                            onChange={(value) => {
                              setUsePreviousCoach(value === "previous");
                              setTime("");
                              setError("");
                            }}
                            onMoreDetails={() => setIsCoachDialogOpen(true)}
                            previousCoach={previousCoach}
                            coachRoleLabels={coachRoleLabels}
                          />
                        </span>
                      </div>
                      {usePreviousCoach && (
                        <CoachContinuityLine
                          previousCoach={previousCoach}
                          coachRoleLabels={coachRoleLabels}
                        />
                      )}
                      <DateTimeSelector
                        selectedDate={date}
                        selectedTime={time}
                        onDateChange={setDate}
                        onTimeChange={setTime}
                        selectedCoachId={
                          usePreviousCoach
                            ? (previousCoach?.coachId ?? null)
                            : null
                        }
                        hideSectionLabel
                      />
                    </>
                  ) : (
                    <DateTimeSelector
                      selectedDate={date}
                      selectedTime={time}
                      onDateChange={setDate}
                      onTimeChange={setTime}
                      selectedCoachId={null}
                    />
                  )}
                </div>
                <div>
                  <div
                    className={cn(
                      "font-medium text-base text-gray-800",
                      teamsCallsEnabled ? "mt-0.5 mb-0.5" : "mb-3",
                    )}
                  >
                    {teamsCallsEnabled
                      ? "Where should we call you if we run into issues connecting? "
                      : "Where should we call you? "}
                    <span className="text-red-500">*</span>
                  </div>
                  <PhoneNumberSelector
                    phone={phone}
                    onPhoneChange={setPhone}
                    selectedOption={phoneOption}
                    onOptionChange={setPhoneOption}
                    teamsCallsMode={teamsCallsEnabled}
                    onLearnMore={
                      teamsCallsEnabled
                        ? () => setIsVideoCallsDialogOpen(true)
                        : undefined
                    }
                  />
                </div>
                <AttachmentUpload
                  name={attachedFileName}
                  onChange={setAttachedFileName}
                />
                <div className="space-y-3">
                  <Button
                    type="button"
                    size="2xl"
                    onClick={handleSubmit}
                    className="w-full"
                  >
                    Confirm and book session
                  </Button>
                  <p className="text-center text-sm italic leading-[21px] text-gray-700">
                    {BOOKING_POLICY}
                  </p>
                </div>
                {isRescheduling && (
                  <Button
                    type="button"
                    variant="tertiary"
                    className="w-full"
                    onClick={() => {
                      if (bookedAppointment) {
                        setSelectedStudent(bookedAppointment.selectedStudent);
                        setCategory(bookedAppointment.category);
                        setTopic(bookedAppointment.topic);
                        setDate(bookedAppointment.date);
                        setTime(bookedAppointment.time);
                        setPhone(bookedAppointment.phone);
                        setPhoneOption(bookedAppointment.phoneOption);
                        setNote(bookedAppointment.note);
                        setAttachedFileName(bookedAppointment.attachedFileName);
                        setUsePreviousCoach(
                          !!bookedAppointment.meetingWithPreviousCoach,
                        );
                      }
                      setIsRescheduling(false);
                      setIsSubmitted(true);
                      setCompletedSteps([0, 1, 2]);
                      setView("management");
                    }}
                  >
                    Cancel changes
                  </Button>
                )}
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
          coachRoleLabels={coachRoleLabels}
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
