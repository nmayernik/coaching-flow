---
date: 2026-10-07
status: Ready for pilot
stakeholders:
  - Shannon Vasconcelos
related_meetings:
  - "[[30 Meetings/2026-04-06 - Review phone counseling copy]]"
related_research:
  - "[[2026-04-08 - Coaching Flow Language]]"
prototype: https://coaching-flow-teams-naming-oct2026.vercel.app/research/teams-naming
decision: Choose the customer-facing name for College Coach's service as phone counseling moves to Microsoft Teams, and identify the explanation needed to set accurate expectations.
target_completion: 2026-10-08
recruitment: UserTesting Contributor Network
tags:
  - research
  - college-coach
  - terminology
---

# Teams Service Naming

Run one unmoderated UserTesting study using the College Coach booking flow. UserTesting handles recruitment through its Contributor Network. Each participant completes one booking with one assigned service name, then compares all six names in matching booking UI. Aim for a provisional naming recommendation on October 8, before Nick leaves for vacation in two days.

Recommend 25 contributors, following the Work vault's UserTesting setup guidance. Keep sessions to approximately 15 minutes, with a 20-minute maximum. The earlier 12-person recommendation is replaced because UserTesting handles recruitment and the broader sample gives more observations across six names. Initial assignment is randomized, so report actual counts per name rather than assuming equal groups.

## Background

Forest's request asks for a replacement for “phone counseling” when the service moves to Teams. The suggested description includes a conversation with an admissions or college finance expert, screen sharing, written chat, and optional webcam use. The prototype already includes a Teams explanation, backup phone selection, and a confirmation link.

The April 15 research synthesis reports that 15 of 25 participants preferred “Book a coaching session,” while 7 preferred “Book an appointment.” Keep this as background evidence and capture alternative names through an open-ended question. For this deadline, the fixed candidate set stays at six. The earlier question concerned booking language with people new to College Coach; it does not establish the best Teams service name. The figures here are reported from the synthesis, rather than a new analysis of its underlying data.

## Goals

- What does each name lead parents to expect when it appears in the booking flow?
- Does the selected name and supporting copy communicate a human conversation on Microsoft Teams, optional camera use, and a backup phone number?
- Which name best fits the experience after people have completed a booking?
- Does adding “Live” clarify the service enough to justify the longer name?

## Method and timing

Use one unmoderated website/prototype test on UserTesting. The participant audience comes from UserTesting's network, with filters and three screeners defined below. No customer outreach or returning-user quota is needed.

Each participant sees one assigned name on their first visit and books once. The same name appears throughout that booking. After the task and comprehension questions, participants see six versions of the same scheduling section, with the service name as the only variable. They choose the clearest name and explain why. They do not repeat the full booking six times.

The prototype handles assignment and comparison order so the test uses one starting URL and one comparison URL within the same UserTesting study. UserTesting's documented Classic six-concept balanced-comparison workflow uses multiple test copies; this plan keeps one study by handling the six-name presentation in the prototype. [UserTesting balanced comparison documentation](https://help.usertesting.com/hc/en-us/articles/13588748183197-Balanced-Comparison-with-multiple-concepts).

- **October 7:** Prepare the UI variants and comparison view, pilot one session, and launch the UserTesting study.
- **October 8:** Review completed sessions as they arrive and produce a one-page recommendation by the end of the workday.

Recruitment is handled by UserTesting. Completion timing still depends on responses; report the actual completed sample at the analysis cutoff if all 25 have not finished. Keep the work to one collection round.

## Participants

Use the UserTesting Contributor Network: US English-speaking parents or guardians of students in grades 9–12 who anticipate seeking help with college admissions or paying for college in the next year. Use Computer and Chrome for this focused naming study. Exclude people working in UX research, content design, or college admissions/finance advising.

Do not exclude low-confidence users of online services. Do not ask about Teams familiarity in the screener, because that could prime the format before the participant sees the UI. Capture relevant experience at the end. UserTesting's audience filters and screeners handle recruitment; there is no separate manual recruitment task.

## Names and UI treatment

Use these six names, preserving the PM's candidate set. Alternative names can be captured in the final open-ended question.

| Variant ID | Service name | Example booking heading |
| --- | --- | --- |
| A | Web counseling | Book web counseling |
| B | Virtual counseling | Book virtual counseling |
| C | Live virtual counseling | Book live virtual counseling |
| D | Digital counseling | Book digital counseling |
| E | Online counseling | Book online counseling |
| F | Live online counseling | Book live online counseling |

Change the name wherever the booking UI explicitly names the service: the booking heading, the explanation heading, named references in helper copy, and the confirmation heading. Example confirmation: “Your virtual counseling session is booked.” Keep the primary action “Confirm and book” constant. Generic field labels such as student, topic, date, time, and backup phone number stay the same.

Hold layout, typography, illustrations, topics, dates, available times, expert title, and service capabilities constant. Both initial booking and comparison views must use the same shared components. The comparison view should show the scheduling context, including the service heading, Teams explanation, date/time area, and backup phone section. A plain list of six words is insufficient for the comparison task.

## Implemented prototype updates

The research preview uses the standard three-step booking flow. These updates are implemented and technically verified. BUC credit mechanics remain outside this study.

| Update | Purpose and source |
| --- | --- |
| Add a central configuration for the six service names and pass it through the booking flow. | Prevent inconsistent labels across `CoachingFormFeature.tsx`, `VideoCallsDialog.tsx`, `PhoneNumberSelector.tsx`, and `SummaryComponents.tsx`. One configuration supports six copy treatments without duplicating the form. |
| Add one participant research entry point with Teams enabled and scenario controls hidden. | `contexts/ScenarioContext.tsx:67` currently initializes Teams as local state. The study URL must work on first load and refresh without requiring a participant to operate the scenario toggle. |
| Randomly assign one name on first visit and retain it throughout the booking. | Store the assignment for the session, support a fixed-variant parameter for QA, and make the displayed name recoverable from the recording. Simple random assignment does not guarantee equal counts. |
| Add a comparison view using the same scheduling UI for all six names. | Preserve the participant's fictional booking context, randomize comparison order independently of the first assignment, keep the order stable on refresh, and let participants review all versions without submitting again. |
| Show Teams, optional camera use, and backup-phone purpose inline at the scheduling step. | `PhoneNumberSelector.tsx:85` currently calls it a video call, while optional-camera copy is behind Learn more in `VideoCallsDialog.tsx:76`. Use the same explanation in every variant. |
| Give the confirmation a clear “Join on Microsoft Teams” action. | `SummaryComponents.tsx:212–219` currently shows a fictional meeting URL. The join task ends at identifying the action; a real meeting or simulated join flow is unnecessary for this decision. |

The preview is built on `nick/teams-naming-study` in an isolated worktree. It uses shared booking components, includes fictional Alex and Jamie student records, and keeps assignment and comparison order in browser storage for 72 hours. Comparison retains the student, topic, date, time, and backup number; it uses a clearly labeled fictional example if the booking cannot be recovered. Record that fallback in the results worksheet.

[Researcher preview and all six fixed variants](https://coaching-flow-teams-naming-oct2026.vercel.app/research/teams-naming/preview). Use its reset action or a fresh private browser context for QA. Send contributors only the participant links below. Keep the preview frozen during collection.

The six booking paths, admissions and finance topics, custom and saved phone options, matching dialog and confirmation wording, cross-tab comparison, stable order on refresh, safe join preview, fallback behavior, and standard-flow regression passed browser checks. The production build passed. Repository-wide TypeScript checking still reports existing button-variant and Sanity typing issues; none originate in the study files.

The remaining pilot is a walkthrough in UserTesting Contributor View to check task routing, recording, and length. No UserTesting study has been launched. Production and the unrelated local checkout on `nick/buc-benefits-menu` have not changed.

## Supporting copy

Use identical format copy across all variants. Include chat and screen sharing if those are intended capabilities of the client experience:

```text
Your [service name] session takes place on Microsoft Teams with a college admissions or college finance expert. You can talk, chat, and share your screen. Your camera is optional.
```

```text
Backup phone number
We'll call this number if you have trouble connecting to Microsoft Teams.
```

Do not promise that an account or app is unnecessary until the intended Bright Horizons meeting policies and devices are confirmed. [Microsoft's joining guidance explains that administrator settings can affect anonymous access.](https://support.microsoft.com/en-us/teams/meetings/join-a-meeting-without-an-account-in-microsoft-teams)

## Test Setup

The hosted links and script are ready to paste into UserTesting. Preview the full sequence in Contributor View before launching; target 15 minutes and shorten prompts if the pilot exceeds 20 minutes.

### Test launcher header

**Test title:**

```text
Teams Service Naming in the Booking Flow October 2026
```

**Workspace:** College Coach

### Audience builder

**Audience name:**

```text
Parents of high school students US desktop 25
```

**Contributors:** 25
**Device:** Computer
**Contributor network:** UserTesting Contributor Network

**Filters:** Countries → United States; Parental status → Parent of teenager; Language → English; Web browsers → Chrome. Use the equivalent available filter labels in the account.

**Screener 1 question:**

```text
Are you a parent or legal guardian of a student currently in grade 9, 10, 11, or 12?
```

**Options:**

```text
Yes
No
```

Yes → qualify. No → disqualify.

**Screener 2 question:**

```text
Do you expect to seek help with college admissions or paying for college for your child within the next 12 months?
```

**Options:**

```text
Yes
No
Not sure
```

Yes → qualify. No and Not sure → disqualify.

**Screener 3 question:**

```text
Which of these best describes your current work?
```

**Options:**

```text
UX research, product design, or content design
College admissions advising or college financial aid advising
None of these
```

First two options → disqualify. None of these → qualify.

### Test plan Starting instructions

**Starting URL:** Use this same URL for all contributors; the prototype assigns the name. Do not add a fixed `variant` parameter to the live study.

```text
https://coaching-flow-teams-naming-oct2026.vercel.app/research/teams-naming
```

Leave “A blank page” unchecked. Skip “Upload prototype” when using the hosted preview.

**Scenario:**

```text
Your child is in high school, and you want help with college admissions or paying for college. Your employer offers College Coach as a benefit. Imagine you have already signed in. You will explore the service and arrange a time to get help. Use only the fictional information provided. Please think aloud so we can understand what you notice and expect.
```

**Contributor View:** ON
**Short test:** OFF

### Test plan Blocks

There are 16 blocks: 4 Tasks, 7 Verbal responses, 2 Rating scales, 2 Multiple-choice questions, and 1 URL asset. Every participant completes the same sequence.

#### 1 Task

Drag Task from Tasks and questions. Paste:

```text
Take a moment to explore what is available, without starting a booking yet. Think aloud about what you notice.
```

#### 2 Verbal response

Drag Verbal response from Tasks and questions. Paste:

```text
In your own words, what can you arrange here, and what would you expect to happen when you take part?
```

This is the initial interpretation of the assigned name in UI context. No separate service description or list of alternatives has been shown yet.

#### 3 Task

```text
Arrange a time to get help with your child's college plans. Choose the topic most relevant to you and use the fictional student information provided. If you need to enter a phone number, use 202-555-0147. Think aloud as you go. Stop when the booking is confirmed.
```

Participants may use existing fictional phone options instead. Do not request real documents or personal data.

#### 4 Verbal response

```text
What did you just book? Imagine it is time to take part. How would the conversation happen, and what would you do next?
```

#### 5 Verbal response

```text
What choices do you have about using your camera? What is the phone number used for? What, if anything, do you expect to need on your device?
```

Code these prompted responses separately from the spontaneous description in Block 4.

#### 6 Task

```text
It is now time to take part. Show where you would go to get started, without opening the link or leaving this page.
```

#### 7 Rating scale

Drag Rating scale from Tasks and questions. Paste:

```text
How easy was it to arrange the booking?
```

Scale size: 5. Low endpoint:

```text
Very difficult
```

High endpoint:

```text
Very easy
```

#### 8 Verbal response

```text
Why did you give that rating? Was any wording unclear or different from what you expected?
```

#### 9 URL

Drag URL from Assets. Use this comparison URL on the same preview origin. It retains the fictional booking context and the first assignment in the same browser.

```text
https://coaching-flow-teams-naming-oct2026.vercel.app/research/teams-naming/compare
```

#### 10 Task

```text
Review all six versions of the booking wording. They describe the same service and use the same booking layout. Think aloud about what each version communicates and whether any would make you expect a different experience. You do not need to book again.
```

The comparison UI carries the same Teams explanation in each version. Review order is randomized in the prototype, not in the task text.

#### 11 Multiple choice

Drag Multiple choice from Tasks and questions. Question:

```text
Which wording best describes the service you just booked?
```

Options:

```text
Web counseling
Virtual counseling
Live virtual counseling
Digital counseling
Online counseling
Live online counseling
None of these
```

Randomize the six candidate options if the available builder supports it; keep None of these last. The prototype comparison order is independently randomized either way.

#### 12 Verbal response

```text
Why did you choose that answer? What would your second choice be, and why?
```

#### 13 Multiple choice

Question:

```text
Which wording would be most likely to give someone the wrong impression of this service?
```

Options:

```text
Web counseling
Virtual counseling
Live virtual counseling
Digital counseling
Online counseling
Live online counseling
None of these
```

#### 14 Verbal response

```text
Why could that wording be misleading? If you could name this service yourself, what would you call it?
```

#### 15 Rating scale

Question:

```text
How clearly does the wording you prefer, including your own alternative if you chose one, describe the service?
```

Scale size: 5. Low endpoint:

```text
Not at all clearly
```

High endpoint:

```text
Very clearly
```

#### 16 Verbal response

```text
Have you used College Coach before? How familiar are you with online meeting services, and did that affect what you expected from this service?
```

### Success metrics for analysis

- **Task 1:** Participant explores the assigned entry screen without starting the booking; the displayed name and initial interpretation are recoverable from the recording.
- **Task 3:** Participant reaches confirmation using fictional information. Record any wording confusion or assistance needed separately from completion.
- **Task 6:** Participant identifies the Teams join action without researcher help or navigating away.
- **Task 10:** Participant reviews all six UI versions and gives a reasoned comparison. Do not treat this as six independent first impressions.

## Analysis and decision rule

Record the first assigned name, actual initial-exposure count per name, booking completion, spontaneous interpretation, prompted camera and backup-phone understanding, join-discovery result, comparison order, preferred name, runner-up, least-clear name, chosen-name clarity rating, and supporting quotes or recording timestamps.

Choose the provisional recommendation using accurate interpretation and fit with the actual experience first, then preference and ease of using the name in UI. Investigate repeated misunderstandings such as expecting an automated service, asynchronous messages, a routine phone call, mandatory camera use, or mental health counseling. Distinguish an incorrect expectation from a detail the participant did not mention.

Compare the “Live” versions with their counterparts to see whether the extra word resolves uncertainty. Report first-choice counts across the completed sample and initial booking observations within each assigned group. The initial groups will be small and may be uneven; do not claim statistical superiority. The later comparison is informed by the booking experience and may show familiarity effects. Check whether preferences simply favor the first assigned name.

The one-page readout should contain a recommendation, runner-up, preference counts with denominators, two or three supporting quotes, required helper copy, and unresolved questions. Name the result a provisional content decision from one round.

## Pilot checks

Verify both research URLs in a fresh browser session. Check that the assigned name stays consistent across all steps, refresh, dialogs, and confirmation; Teams is enabled automatically; scenario controls and unrelated navigation are hidden; fictional information is sufficient; all six comparison versions share the same UI and capabilities; comparison order is randomized but stable on refresh; and the mock join link is not opened during the task. Pilot the full 16-block sequence and shorten prompts if it exceeds 20 minutes. Freeze the tested preview during collection.

## Out of scope

- Manual recruitment or a required existing-customer cohort.
- Choosing the expert's job title or changing booking architecture.
- BUC credit mechanics, production Teams integration, or meeting reliability.
- Requiring another test round before vacation.
- Statistically significant six-way conversion comparisons.
- Mobile journey validation in this desktop study.

## Items to resolve before launch

- [x] One unmoderated study, using UserTesting's recruitment network, with an October 8 readout target.
- [x] All six names appear in matching booking UI rather than standalone word cards.
- [x] Audience filters, three screeners, and the 16-block script are drafted.
- [x] Build and verify the booking variants and comparison view; replace the two URL placeholders.
- [x] Match the Teams capability copy to the PM’s supplied description and existing prototype (chat, screen sharing, optional camera, backup phone).
- [ ] Pilot the full 16-block sequence in UserTesting Contributor View, then launch the one testing round.

## Prepared materials

- [Researcher preview](https://coaching-flow-teams-naming-oct2026.vercel.app/research/teams-naming/preview): random booking, comparison, fixed A–F variants, and reset.
- [Copy-ready UserTesting plan](https://coaching-flow-teams-naming-oct2026.vercel.app/research-materials/teams-naming-user-testing.md).
- [25-participant results worksheet](https://coaching-flow-teams-naming-oct2026.vercel.app/research-materials/teams-naming-results.csv).
- [One-page readout template](https://coaching-flow-teams-naming-oct2026.vercel.app/research-materials/teams-naming-readout.md).

## Sources

- PM request supplied by Nick in the October 7 chat attachment: `/var/folders/p7/kh51ngb907x226y54p4nm_8w0000gn/T/codex-clipboard-9387cbcf-0d5a-41bc-abad-8b2282720bee.png`.
- [[2026-04-08 - Coaching Flow Language]], earlier study plan.
- [April 15 research synthesis](Coaching%20Flow%20Language%20-%20Research%20Synthesis.docx), reported booking-language results.
- [[30 Meetings/2026-04-06 - Review phone counseling copy]], stakeholder context; the later synthesis provides the subsequent reported results.
- Local prototype source: `/Users/nickmayernik/Documents/Work/Bright Horizons/coaching-flow`, inspected October 7, 2026.
