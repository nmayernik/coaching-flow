"use client"

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CoachingFormAccordionProps {
  onStepChange?: (step: number) => void;
  onCompletedStepsChange?: (completedSteps: number[]) => void;
}

export default function CoachingFormAccordion({ 
  onStepChange, 
  onCompletedStepsChange 
}: CoachingFormAccordionProps) {
  // State for form values
  const [step, setStep] = React.useState(0); // 0, 1, 2
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]); // Track completed steps
  const [student, setStudent] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [note, setNote] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState("");

  // Notify parent of step changes
  React.useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  // Notify parent of completed steps changes
  React.useEffect(() => {
    onCompletedStepsChange?.(completedSteps);
  }, [completedSteps, onCompletedStepsChange]);

  // Validation per step
  function validateStep(idx: number) {
    if (idx === 0) {
      if (!student) return "Please select a student.";
      if (!category) return "Please select a category.";
    }
    if (idx === 1) {
      if (!topic) return "Please select a topic.";
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
    
    // Mark current step as completed
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

  // Handle accordion value change
  function handleAccordionChange(value: string) {
    if (value) {
      const stepNum = parseInt(value.replace('step', ''));
      setStep(stepNum);
    }
  }

  // Summary components
  const Step1Summary = () => (
    <div className="border border-gray-100 rounded-2xl p-4 mb-4 bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-xl text-gray-800">{category} Appointment</h3>
          <p className="text-gray-700">For {student}</p>
        </div>
        <Button 
          variant="outline" 
          size="default" 
          onClick={() => handleEdit(0)}
          className="text-blue-700 border-gray-300 hover:bg-blue-50"
        >
          Edit
        </Button>
      </div>
    </div>
  );

  const Step2Summary = () => (
    <div className="border rounded-lg p-4 mb-4 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">Topic Selected</h3>
          <p className="text-gray-600">{topic}</p>
          {note && <p className="text-gray-500 text-sm mt-1">Note: {note}</p>}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleEdit(1)}
          className="text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          Edit
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full mx-auto font-sans">
      {/* Show summary cards for completed steps */}
      {completedSteps.includes(0) && <Step1Summary />}
      {completedSteps.includes(1) && <Step2Summary />}

      <Accordion.Root 
        type="single" 
        value={`step${step}`} 
        onValueChange={handleAccordionChange}
        collapsible 
        className="w-full"
      >
        {/* Step 1 - Only show if not completed */}
        {!completedSteps.includes(0) && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
            <Accordion.Item value="step0" className="border-none">
              <Accordion.Header>
                <Accordion.Trigger className="w-full text-left font-semibold text-lg">
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-8 pt-2 pb-8 space-y-12">
                <div>
                  <div className="mb-4 font-medium text-xl text-gray-800">Choose a student <span className="text-red-500">*</span></div>
                  <div className="grid grid-cols-3 gap-4">
                    {["Nick", "Christopher", "Sarah"].map((s, index) => {
                      const initials = s.split(' ').map(name => name[0]).join('').toUpperCase();
                      const avatarColors = [
                        "bg-blue-700",     // Nick - Blue
                        "bg-success-500",    // Christopher - Green
                        "bg-purple-700",   // Sarah - Purple
                      ];
                      const avatarColor = avatarColors[index];
                      
                      return (
                        <label key={s} className={`px-4 py-6 rounded-xl border cursor-pointer hover:bg-gray-25 transition-colors flex flex-col items-center justify-center ${student === s ? "ring-blue-700 ring-2 border-0 hover:bg-blue-25" : "border-gray-400"}`}>
                          <input
                            type="radio"
                            name="student"
                            value={s}
                            checked={student === s}
                            onChange={() => setStudent(s)}
                            className="sr-only"
                          />
                          <div className={`w-8 h-8 ${avatarColor} rounded-full flex items-center justify-center mb-2`}>
                            <span className="text-white font-medium text-sm">{initials}</span>
                          </div>
                          <div className="font-medium text-gray-800 text-center">{s}</div>
                          <div className="text-xs text-gray-700 text-center">3 sessions available</div>
                        </label>
                      );
                    })}
                  </div>
                  <button className="flex items-center text-blue-700 hover:text-blue-700 mt-3 text-sm font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add student
                  </button>
                </div>
                
                <div>
                  <div className="mb-4 font-medium text-xl text-gray-800">Choose a category <span className="text-red-500">*</span></div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Academic Foundations", desc: "Setting your student up for success in education and beyond" },
                      { name: "College Admissions", desc: "Advice for college selection and applications" },
                      { name: "College Finance", desc: "Advice on managing college costs and aid" },
                      { name: "College to Career", desc: "Advice on navigating the transition to the workplace" },
                      { name: "Financial Wellness", desc: "Advice on building and maintaining smart money habits" }
                    ].map((c) => (
                      <label key={c.name} className={`p-4 rounded-xl border cursor-pointer hover:bg-gray-50 transition-colors ${category === c.name ? "ring-blue-700 ring-2 border-white hover:bg-blue-25" : "border-gray-400"}`}>
                        <input
                          type="radio"
                          name="category"
                          value={c.name}
                          checked={category === c.name}
                          onChange={() => setCategory(c.name)}
                          className="sr-only"
                        />
                        <div className="font-medium text-gray-800">{c.name}</div>
                        <div className="text-sm text-gray-700 mt-1">{c.desc}</div>
                      </label>
                    ))}
                  
                  </div>
                </div>
                
                {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
                <Button type="button" variant="default" size="lg" onClick={() => handleContinue(0)} className="w-full !text-lg bg-yellow-500 hover:bg-yellow-400 text-blue-800 rounded-xl font-semibold px-6 !py-7">Continue</Button>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        )}

        {/* Step 2 - Only show if not completed and step >= 1 */}
        {!completedSteps.includes(1) && step >= 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 overflow-hidden">
            <Accordion.Item value="step1" className="border-none">
              <Accordion.Header>
                <Accordion.Trigger className="w-full text-left py-4 px-6 font-semibold text-lg">
                  2. Choose a topic & add a note
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="p-6 space-y-6">
                <div>
                  <div className="mb-4 font-medium text-gray-900">Choose a topic in {category} <span className="text-red-500">*</span></div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: "Selecting Best-Fit Colleges", desc: "Setting your student up for success in education and beyond" },
                      { title: "Preparing College Applications", desc: "Advice for college selection and applications" },
                      { title: "Navigating the UC application", desc: "Advice on navigating the transition to the workplace" },
                      { title: "Alternatives to a 4-Year Degree", desc: "Advice on building and maintaining smart money habits" },
                      { title: "Understanding the College Major: From Undecided to Employed", desc: "Advice on managing college costs and aid" },
                      { title: "The Common Application: What You Need to Know", desc: "Advice on managing college costs and aid" },
                      { title: "Associate to Bachelor's: Starting a College Career At a Two-Year School/Community College", desc: "Advice on managing college costs and aid" }
                    ].map((t) => (
                      <label key={t.title} className={`p-4 rounded-xl border cursor-pointer hover:bg-gray-50 transition-colors ${topic === t.title ? "ring-blue-700 ring-2 border-0 hover:bg-blue-25" : "border-gray-400"}`}>
                        <input
                          type="radio"
                          name="topic"
                          value={t.title}
                          checked={topic === t.title}
                          onChange={() => setTopic(t.title)}
                          className="sr-only"
                        />
                        <div className="font-medium text-md text-gray-800">{t.title}</div>
                        <div className="text-sm text-gray-700 mt-1">{t.desc}</div>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-4 font-medium text-gray-900">Add a note to your coach</div>
                  <Textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Value" className="min-h-[100px] rounded-xl border-gray-200" />
                </div>
                {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
                <Button type="button" onClick={() => handleContinue(1)} className="w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2">Continue</Button>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        )}

        {/* Step 3 - Only show if step >= 2 */}
        {step >= 2 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 overflow-hidden">
            <Accordion.Item value="step2" className="border-none">
              <Accordion.Header>
                <Accordion.Trigger className="w-full text-left py-4 px-6 font-semibold text-lg">
                  3. Date & time, phone, document
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="p-6 space-y-6">
                <div>
                  <div className="mb-4 font-medium text-gray-900">Choose a date</div>
                  <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="rounded-xl border-gray-200" />
                </div>
                <div>
                  <div className="mb-4 font-medium text-gray-900">Choose a time</div>
                  <Input type="time" value={time} onChange={e => setTime(e.target.value)} className="rounded-xl border-gray-200" />
                </div>
                <div>
                  <div className="mb-4 font-medium text-gray-900">Phone number</div>
                  <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(000) 000-0000" className="rounded-xl border-gray-200" />
                </div>
                <div>
                  <div className="mb-4 font-medium text-gray-900">Attach a document (optional)</div>
                  <Input type="file" className="rounded-xl border-gray-200" />
                </div>
                {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
                <Button type="button" className="w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2">Schedule Appointment</Button>
              </Accordion.Content>
            </Accordion.Item>
          </div>
        )}
      </Accordion.Root>
    </div>
  );
} 