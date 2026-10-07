# Teams naming study · October 2026

Status: ready for a Contributor View pilot; no study launched.

## Participant links

- Booking: https://coaching-flow-teams-naming-oct2026.vercel.app/research/teams-naming
- Comparison (URL asset after Block 8): https://coaching-flow-teams-naming-oct2026.vercel.app/research/teams-naming/compare
- Researcher preview: https://coaching-flow-teams-naming-oct2026.vercel.app/research/teams-naming/preview

This is a manually pinned research alias. Do not repoint it during collection. Production remains https://coaching-flow.vercel.app.

## Materials

The copy-ready script, blank results CSV, and one-page readout are in `public/research-materials/`. The human-facing source plan is in Nick's Work vault under `20 Research/2026-10-07 - Teams Service Naming.md`. UserTesting recruits 25 US parents of high-school students; one unmoderated round, approximately 15–20 minutes, with an October 8 readout target.

## Design controls

Six fixed PM names, central configuration A–F. A contributor sees one randomly assigned name throughout one booking, then all six in the same shared scheduling component. The comparison order is independently randomized and stable in browser storage for 72 hours. There are no candidate-name controls or links to the researcher index in the initial booking. Comparison is read-only, with a viewed-count reminder. All variants use the same capabilities and fictional students/phone numbers. No backend booking or analytics submission occurs. Recording and responses are collected in UserTesting.

Keep both URL assets on the same origin and use the same browser. If storage is blocked or missing, comparison shows a labeled example; code that session separately and recover the first name from the recording. Do not treat the six informed comparisons as six independent first impressions. Simple random assignment may give uneven first-exposure groups.

## Verification · October 7

- Completed A–F bookings, confirming matching entry, scheduling, dialog, and confirmation names.
- Admissions and finance categories, Alex and Jamie records, saved mobile number and one-time phone input.
- Safe Teams join action does not navigate or open an external meeting.
- Cross-tab comparison preserves the selected student, topic, date, time, and phone. All six tabs work; submission is disabled.
- Assignment and comparison order persist on refresh. Missing, malformed, and blocked storage recover gracefully with labeled comparison fallback.
- Desktop comparison and 390px layout inspected; no horizontal overflow.
- Standard default booking regression completed, preserving original phone-call behavior.
- `node scripts/test-teams-naming-session.cjs` passed assignment/order/state validation checks.
- `next build --webpack` passed. Global `tsc --noEmit` still reports existing unsupported button variants and implicit-any Sanity types; the study files have no diagnostics.

## Launch and analysis

Use the downloadable script for three screeners and 16 blocks. Pilot in UserTesting Contributor View to confirm URL routing, audio/recording, and timing. Then launch once. Record actual counts by assigned name, spontaneous and prompted comprehension separately, preference, runner-up, misleading name, and quotes with timestamps. Choose a provisional name using accurate expectations first, then preference. Report missing/unfinished responses at the October 8 cutoff.
