"use client"

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Link, Monitor, VideoOff, Phone, Crosshair } from "lucide-react";

interface VideoCallsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VideoCallsDialog({
  isOpen,
  onOpenChange
}: VideoCallsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <DialogTitle className="text-lg lg:text-xl font-semibold text-blue-900">
              Video Calls in College Coach
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm lg:text-base text-gray-700 mt-2">
            Coaching sessions now take place through Microsoft Teams.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 lg:mt-6">
          <h3 className="text-sm lg:text-base font-medium text-gray-900 mb-3 lg:mb-4">
            What this means for you
          </h3>

          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Link className="w-4 h-4 text-blue-700" />
                </div>
              </div>
              <p className="text-sm lg:text-base text-gray-700 flex-1">
                Join your session from a link on your preferred device
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-blue-700" />
                </div>
              </div>
              <p className="text-sm lg:text-base text-gray-700 flex-1">
                Screen share with your coach
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <VideoOff className="w-4 h-4 text-blue-700" />
                </div>
              </div>
              <p className="text-sm lg:text-base text-gray-700 flex-1">
                You do not have to be on camera, but our coaches will be.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-700" />
                </div>
              </div>
              <p className="text-sm lg:text-base text-gray-700 flex-1">
                If you&apos;re having trouble connecting, we&apos;ll reach out to the backup phone number you selected when scheduling.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 lg:mt-6 pt-4 lg:pt-5 border-t border-gray-200">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Crosshair className="w-3.5 h-3.5 text-blue-700" />
            </div>
            <p className="text-sm lg:text-base text-gray-700">
              For more details, visit the{" "}
              <a
                href="#"
                className="text-blue-700 hover:text-blue-800 underline font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  // In a real app, this would navigate to the help center
                }}
              >
                Help Center
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
