import { AlertCircle } from "lucide-react";

interface NoAppointmentsBannerProps {
  studentName?: string;
}

export function NoAppointmentsBanner({ studentName = "All students" }: NoAppointmentsBannerProps) {
  return (
    <div className="bg-[#fde7e7] border border-[#f47171] rounded-xl px-4 py-3 mb-4">
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          <AlertCircle className="h-6 w-6 text-[#8e0b0b]" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-[#8e0b0b] text-base leading-6">
            {studentName} have 0 sessions remaining
          </div>
          <div className="text-[#333333] text-sm leading-5">
            Your session limit will renew on your next billing cycle.
          </div>
        </div>
      </div>
    </div>
  );
} 