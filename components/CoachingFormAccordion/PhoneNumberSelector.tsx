"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PhoneNumberSelectorProps {
  phone: string;
  onPhoneChange: (phone: string) => void;
  selectedOption: string;
  onOptionChange: (option: string) => void;
  teamsCallsMode?: boolean;
  onLearnMore?: () => void;
}

const PHONE_OPTIONS = [
  { id: "home", label: "Home", number: "(000) 000-0000" },
  { id: "mobile", label: "Mobile", number: "(000) 000-0000" },
  { id: "work", label: "Work", number: "(000) 000-0000" },
];

export function PhoneNumberSelector({
  phone,
  onPhoneChange,
  selectedOption,
  onOptionChange,
  teamsCallsMode = false,
  onLearnMore,
}: PhoneNumberSelectorProps) {
  const [customPhone, setCustomPhone] = React.useState(
    selectedOption === "custom" ? phone : "",
  );
  const options = PHONE_OPTIONS;
  const select = (id: string) => {
    onOptionChange(id);
    onPhoneChange(
      id === "custom"
        ? customPhone
        : (options.find((option) => option.id === id)?.number ?? ""),
    );
  };
  return (
    <div className="space-y-3">
      {teamsCallsMode && (
        <p className="text-sm leading-[21px] text-gray-700">
          Your appointment will take place over video call, but we&apos;ll reach
          out by phone if we run into issues.
          {onLearnMore && (
            <>
              {" "}
              <button
                type="button"
                onClick={onLearnMore}
                className="rounded text-blue-700 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Learn more
              </button>
            </>
          )}
        </p>
      )}
      <div
        className="grid grid-cols-2 gap-x-3 gap-y-4 lg:grid-cols-3"
        role="radiogroup"
        aria-label={teamsCallsMode ? "Backup phone number" : "Phone number"}
      >
        {[
          ...options,
          { id: "custom", label: "Add a one-time phone number", number: "" },
        ].map((option) => (
          <label
            key={option.id}
            className={cn(
              "flex min-h-[80px] cursor-pointer flex-col items-center justify-center rounded-xl border bg-white px-3 py-4 text-center shadow-sm hover:bg-blue-25 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2",
              selectedOption === option.id
                ? "border-blue-700 ring-1 ring-blue-700"
                : "border-gray-400",
            )}
          >
            <input
              type="radio"
              name="phone"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => select(option.id)}
              className="sr-only"
            />
            <span className="text-base font-semibold leading-6 text-gray-800">
              {option.label}
            </span>
            {option.number && (
              <span className="whitespace-nowrap text-base leading-6 text-gray-700">
                {option.number}
              </span>
            )}
          </label>
        ))}
      </div>
      {selectedOption === "custom" && (
        <div className="space-y-2">
          <label
            htmlFor="custom-phone"
            className="block text-sm font-medium text-gray-800"
          >
            One-time phone number
          </label>
          <Input
            id="custom-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(000) 000-0000"
            value={phone}
            onChange={(event) => {
              const digits = event.target.value.replace(/\D/g, "").slice(0, 10);
              const formatted =
                digits.length <= 3
                  ? digits
                  : digits.length <= 6
                    ? `(${digits.slice(0, 3)}) ${digits.slice(3)}`
                    : `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
              setCustomPhone(formatted);
              onPhoneChange(formatted);
            }}
            className="h-12 rounded-lg border-gray-400"
          />
          <p className="text-sm text-gray-700">
            This number will only be used for this appointment.
          </p>
        </div>
      )}
    </div>
  );
}
