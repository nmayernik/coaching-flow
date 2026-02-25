"use client";

import Link from "next/link";
import { CHANGELOG, CURRENT_VERSION, type ChangelogChangeType } from "@/lib/changelog";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const typeLabels: Record<ChangelogChangeType, string> = {
  added: "Added",
  changed: "Changed",
  fixed: "Fixed",
  removed: "Removed",
  security: "Security",
};

const typeStyles: Record<ChangelogChangeType, string> = {
  added: "bg-emerald-100 text-emerald-800 border-emerald-200",
  changed: "bg-amber-100 text-amber-800 border-amber-200",
  fixed: "bg-blue-100 text-blue-800 border-blue-200",
  removed: "bg-gray-100 text-gray-700 border-gray-200",
  security: "bg-red-100 text-red-800 border-red-200",
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6 -ml-2 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to form
          </Button>
        </Link>

        <header className="mb-10">
          <h1 className="text-2xl font-semibold text-gray-900">Changelog</h1>
          <p className="mt-1 text-sm text-gray-500">
            Version history for the coaching form. Current: <strong className="text-gray-700">{CURRENT_VERSION}</strong>
          </p>
        </header>

        <div className="space-y-10">
          {CHANGELOG.map((entry) => (
            <section
              key={entry.version}
              className="border border-gray-200 rounded-lg bg-white p-5 sm:p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-baseline gap-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">v{entry.version}</h2>
                <time className="text-sm text-gray-500" dateTime={entry.date}>
                  {formatDate(entry.date)}
                </time>
              </div>
              <ul className="space-y-2">
                {entry.changes.map((change, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span
                      className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium ${typeStyles[change.type]}`}
                    >
                      {typeLabels[change.type]}
                    </span>
                    <span className="text-gray-700">{change.description}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
