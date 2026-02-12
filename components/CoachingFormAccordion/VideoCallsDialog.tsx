"use client"

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Link, Monitor, VideoOff, Phone, Crosshair, ArrowUp } from "lucide-react";

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
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Monitor className="w-6 h-6 text-blue-700" />
            </div>
            
          </div>
          <DialogTitle className="text-lg lg:text-2xl font-semibold text-blue-800">
              Video Calls in College Coach
            </DialogTitle>
          <DialogDescription className="text-base text-gray-700">
            Coaching sessions now take place through Microsoft Teams.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <h3 className="text-base font-medium text-gray-700 mb-3 lg:mb-4">
            What this means for you
          </h3>

          <div className="space-y-3 lg:space-y-4">
            <div className="flex gap-3 items-center">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Link className="w-5 h-5 text-blue-700" />
                </div>
              </div>
              <p className="text-base text-gray-700 flex-1">
                Join your session from a link on your preferred device
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 flex items-center justify-center">
                <ArrowUp className="w-5 h-5 text-blue-700" />

                </div>
              </div>
              <p className="text-base text-gray-700 flex-1">
                Take advantage of features like screen sharing with your coach.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 flex items-center justify-center">
                  <VideoOff className="w-5 h-5 text-blue-700" />
                </div>
              </div>
              <p className="text-base text-gray-700 flex-1">
                You do not have to be on camera.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-700" />
                </div>
              </div>
              <p className="text-base text-gray-700 flex-1">
                We'll call you by phone at your backup number if you&apos;re having trouble connecting.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 flex items-center gap-2">

            <p className="text-sm lg:text-base text-gray-700">
              For more details, visit the{" "}
              <a
                href="#"
                className="text-blue-700 underline hover:no-underline font-medium"
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
