/**
 * Changelog entries for the coaching form.
 * Use semver: MAJOR.MINOR.PATCH
 * - MAJOR: breaking changes
 * - MINOR: new features (backward compatible)
 * - PATCH: bug fixes, small tweaks
 */

export type ChangelogChangeType = "added" | "changed" | "fixed" | "removed" | "security";

export interface ChangelogEntry {
  version: string; // semver, e.g. "1.2.0"
  date: string; // YYYY-MM-DD
  changes: Array<{
    type: ChangelogChangeType;
    description: string;
  }>;
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "0.1.0",
    date: "2025-02-16",
    changes: [
      { type: "added", description: "Initial coaching session scheduling form with student, topic, focus area, and date/time steps." },
      { type: "added", description: "UI scenarios panel for testing (default, existing students, no appointments, no topics, no dates)." },
      { type: "added", description: "Coach continuity and Teams calls toggles in scenarios." },
      { type: "added", description: "Changelog page with hidden link from scenarios panel." },
    ],
  },
];

/** Current app version; keep in sync with package.json when releasing. */
export const CURRENT_VERSION = "0.1.0";
