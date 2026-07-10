---
name: Mobile API wiring
description: How the FaithConnect mobile app fetches real data — API client location, URL construction, transform patterns, and wiring rules.
---

## API client
`artifacts/faithconnect/services/api.ts` — single file, no generated client. Exports typed async functions that hit `/api/*` and transform server shapes to mobile types.

**Base URL:**
```ts
const API_BASE = process.env.EXPO_PUBLIC_DOMAIN
  ? `https://${process.env.EXPO_PUBLIC_DOMAIN}/api`
  : "http://localhost:8080/api";
```
`EXPO_PUBLIC_DOMAIN` is injected by the Expo workflow as `$REPLIT_DEV_DOMAIN`.

## Key transforms
- `date` (ISO "2024-05-19") → formatted "May 19, 2024" for display
- `duration` (integer minutes) → "42:00" string (sermons) or "15 min" label (lessons)
- `thumbnailUrl` → falls back to a curated Unsplash URL constant per resource type
- Event `month`/`day` fields are pre-computed in the transform, not in the component
- Discussion `type` → mobile tag label map: general→"Discussion", prayer_request→"Prayer Request", announcement→"Announcement"

## Filtering — critical
All API calls must filter by publish/active status so draft records never surface in mobile:
- Sermons: `publishStatus: "published"`
- Events: `publishStatus: "published"`
- Bible studies: `status: "active"`
- Discussions: `status: "active"`

## Mobile types exported
- `MobileStudySeries` — matches old `StudySeries` from bibleStudyMockData
- `MobileStudyLesson` — matches old `StudyLesson`; `defaultStatus` always "start" (progress tracked locally in BibleStudyContext)

## Bible study lesson routing
Lesson links always require `?studyId=SERIES_UUID`:
```
/bible-study/lesson/${lesson.id}?studyId=${series.id}
```
`lesson/[id].tsx` reads `{ id, studyId }` from `useLocalSearchParams` and calls `fetchLessonFromStudy(studyId, id)`.

## What stays static (no DB table)
- `dailyVerse` — hardcoded editorial constant in Home screen
- `quickActions` — UI config constant in Home screen
- `userProfile` — hardcoded until auth is added
- Give tab / givingFunds — no backend table yet

## Schema additions made during wiring
- `lessonsTable`: added `shortTitle`, `scriptureText`, `thumbnailUrl`, `keyThought`, `teachingNotes`, `prayerPoint`, `reflectionQuestions` (text, JSON-serialised string[])
- `discussionsTable`: added `likes` integer (default 0)

**Why:** lesson content fields needed for lesson detail screen; likes needed for community post display.

## scripts/package.json
`drizzle-orm: "catalog:"` must be a direct dependency — it's not hoisted transitively from `@workspace/db` when running `tsx ./src/seed.ts`.
