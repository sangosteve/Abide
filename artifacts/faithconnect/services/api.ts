/**
 * Abide mobile API client.
 * Transforms server responses into the mobile type shapes expected by screens.
 */

import type {
  Sermon,
  SermonSeries,
  Event,
  CommunityPost,
} from "@/types";

// ── Base URL ──────────────────────────────────────────────────────────────────
// In Replit, EXPO_PUBLIC_DOMAIN is injected by the workflow.
// Locally, point at the running API server port.
const API_BASE = process.env.EXPO_PUBLIC_DOMAIN
  ? `https://${process.env.EXPO_PUBLIC_DOMAIN}/api`
  : "http://localhost:8080/api";

// ── Helpers ───────────────────────────────────────────────────────────────────

async function get<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${API_BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

/** "2024-05-19" → "May 19, 2024" */
function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number) as [number, number, number];
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** integer minutes → "42:15" display string */
function fmtDuration(mins: number | null | undefined): string {
  if (!mins) return "45:00";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:00` : `${mins}:00`;
}

/** minutes-only duration → "15 min" label */
function fmtDurationLabel(mins: number | null | undefined): string {
  if (!mins) return "";
  return `${mins} min`;
}

/** ISO timestamp → "3h ago" / "2d ago" */
function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return `${Math.floor(d / 7)}w ago`;
}

/** Deterministic avatar URL from a name string */
function avatarUrl(name: string): string {
  const hash = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return `https://i.pravatar.cc/150?img=${(hash % 70) + 1}`;
}

const FALLBACK_SERMON = "https://images.unsplash.com/photo-1429514513361-8a632ff5f2ba?w=800";
const FALLBACK_EVENT  = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800";
const FALLBACK_STUDY  = "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800";

// ── Raw API response shapes ───────────────────────────────────────────────────

interface ApiSermon {
  id: string;
  title: string;
  speaker: string;
  series: string | null;
  scripture: string | null;
  date: string;
  duration: number | null;
  summary: string | null;
  thumbnailUrl: string | null;
  publishStatus: "draft" | "scheduled" | "published";
  views: number;
  createdAt: string;
}

interface ApiEvent {
  id: string;
  title: string;
  category: string | null;
  host: string | null;
  date: string;
  time: string | null;
  venue: string | null;
  address: string | null;
  description: string | null;
  bannerUrl: string | null;
  registrations: number;
  capacity: number | null;
  publishStatus: string;
}

interface ApiStudy {
  id: string;
  title: string;
  series: string | null;
  leader: string | null;
  studyType: string;
  description: string | null;
  lessonCount: number;
  participants: number;
  progress: number;
  status: string;
  coverImageUrl: string | null;
  startDate: string | null;
}

interface ApiLesson {
  id: string;
  studyId: string;
  title: string;
  shortTitle: string | null;
  scripture: string | null;
  scriptureText: string | null;
  duration: number | null;
  thumbnailUrl: string | null;
  keyThought: string | null;
  teachingNotes: string | null;
  reflectionQuestions: string | null; // JSON string
  prayerPoint: string | null;
  orderIndex: number;
  status: string;
  createdAt: string;
}

interface ApiDiscussion {
  id: string;
  title: string;
  authorName: string;
  group: string | null;
  type: "general" | "prayer_request" | "announcement";
  replies: number;
  likes: number;
  reports: number;
  sentiment: string;
  status: string;
  content: string | null;
  createdAt: string;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

// ── Mobile study types ────────────────────────────────────────────────────────
// These match what bible-study screens expect (closely matching bibleStudyMockData shapes)

export interface MobileStudySeries {
  id: string;
  title: string;
  description: string;
  teacher: string;
  teacherTitle: string;
  teacherAvatar: string;
  image: string;
  totalSessions: number;
  lessons: MobileStudyLesson[];
}

export interface MobileStudyLesson {
  id: string;
  seriesId: string;
  title: string;
  shortTitle: string;
  seriesTitle: string;
  duration: string;
  date: string;
  thumbnail: string;
  defaultStatus: "completed" | "resume" | "start";
  scripture: { reference: string; text: string };
  keyThought: string;
  teachingNotes: string;
  reflectionQuestions: string[];
  prayerPoint: string;
}

// ── Transform functions ────────────────────────────────────────────────────────

function toMobileSermon(s: ApiSermon): Sermon {
  return {
    id: s.id,
    title: s.title,
    speaker: s.speaker,
    date: fmtDate(s.date),
    scripture: s.scripture ?? "",
    duration: fmtDuration(s.duration),
    thumbnail: s.thumbnailUrl ?? FALLBACK_SERMON,
    description: s.summary ?? "",
    series: s.series ?? "",
    isNew: s.publishStatus === "published" &&
      Date.now() - new Date(s.createdAt).getTime() < 7 * 86_400_000,
  };
}

function toMobileEvent(e: ApiEvent): Event {
  const parts = e.date.split("-");
  const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return {
    id: e.id,
    title: e.title,
    category: e.category ?? "General",
    date: fmtDate(e.date),
    time: e.time ?? "TBD",
    venue: e.venue ?? "",
    host: e.host ?? "",
    description: e.description ?? "",
    image: e.bannerUrl ?? FALLBACK_EVENT,
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: String(d.getDate()),
  };
}

function toMobilePost(d: ApiDiscussion): CommunityPost {
  const tagMap: Record<ApiDiscussion["type"], string> = {
    general: "Discussion",
    prayer_request: "Prayer Request",
    announcement: "Announcement",
  };
  return {
    id: d.id,
    author: d.authorName,
    role: d.group ?? undefined,
    avatar: avatarUrl(d.authorName),
    timeAgo: timeAgo(d.createdAt),
    tag: tagMap[d.type] ?? "Discussion",
    content: d.content ?? d.title,
    likes: d.likes,
    comments: d.replies,
    isLiked: false,
  };
}

function toMobileLesson(l: ApiLesson, seriesTitle: string): MobileStudyLesson {
  let reflectionQuestions: string[] = [];
  try {
    if (l.reflectionQuestions) {
      reflectionQuestions = JSON.parse(l.reflectionQuestions) as string[];
    }
  } catch {
    // ignore parse errors
  }
  return {
    id: l.id,
    seriesId: l.studyId,
    title: l.title,
    shortTitle: l.shortTitle ?? l.title,
    seriesTitle,
    duration: fmtDurationLabel(l.duration),
    date: fmtDate(l.createdAt.split("T")[0]!),
    thumbnail: l.thumbnailUrl ?? FALLBACK_STUDY,
    defaultStatus: "start",
    scripture: {
      reference: l.scripture ?? "",
      text: l.scriptureText ?? "",
    },
    keyThought: l.keyThought ?? "",
    teachingNotes: l.teachingNotes ?? "",
    reflectionQuestions,
    prayerPoint: l.prayerPoint ?? "",
  };
}

function toMobileSeries(
  s: ApiStudy,
  lessons: ApiLesson[],
): MobileStudySeries {
  return {
    id: s.id,
    title: s.title,
    description: s.description ?? "",
    teacher: s.leader ?? "Church Staff",
    teacherTitle: "Teacher",
    teacherAvatar: avatarUrl(s.leader ?? "Teacher"),
    image: s.coverImageUrl ?? FALLBACK_STUDY,
    totalSessions: s.lessonCount,
    lessons: lessons
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((l) => toMobileLesson(l, s.title)),
  };
}

// ── Public API ────────────────────────────────────────────────────────────────

/** All published sermons */
export async function fetchSermons(): Promise<Sermon[]> {
  const res = await get<PaginatedResponse<ApiSermon>>("/sermons", {
    publishStatus: "published",
    limit: "50",
  });
  return res.items.map(toMobileSermon);
}

/** Single sermon by ID */
export async function fetchSermon(id: string): Promise<Sermon> {
  const s = await get<ApiSermon>(`/sermons/${id}`);
  return toMobileSermon(s);
}

/** All published events */
export async function fetchEvents(): Promise<Event[]> {
  const res = await get<PaginatedResponse<ApiEvent>>("/events", {
    publishStatus: "published",
    limit: "50",
  });
  return res.items.map(toMobileEvent);
}

/** Single event by ID */
export async function fetchEvent(id: string): Promise<Event> {
  const e = await get<ApiEvent>(`/events/${id}`);
  return toMobileEvent(e);
}

/** Community discussions as mobile posts */
export async function fetchDiscussions(type?: ApiDiscussion["type"]): Promise<CommunityPost[]> {
  const params: Record<string, string> = { limit: "50", status: "active" };
  if (type) params.type = type;
  const res = await get<PaginatedResponse<ApiDiscussion>>("/discussions", params);
  return res.items.map(toMobilePost);
}

/** All active bible study series with their lessons */
export async function fetchStudySeries(): Promise<MobileStudySeries[]> {
  const res = await get<PaginatedResponse<ApiStudy>>("/bible-studies", {
    status: "active",
    limit: "20",
  });
  const seriesWithLessons = await Promise.all(
    res.items.map(async (s) => {
      const detail = await get<ApiStudy & { lessons: ApiLesson[] }>(`/bible-studies/${s.id}`);
      return toMobileSeries(detail, detail.lessons ?? []);
    }),
  );
  return seriesWithLessons;
}

/** Single series with lessons */
export async function fetchStudy(id: string): Promise<MobileStudySeries> {
  const detail = await get<ApiStudy & { lessons: ApiLesson[] }>(`/bible-studies/${id}`);
  return toMobileSeries(detail, detail.lessons ?? []);
}

/** Create a discussion / community post */
export async function createDiscussion(input: {
  title: string;
  content: string;
  type: ApiDiscussion["type"];
  authorName: string;
  group?: string;
}): Promise<CommunityPost> {
  const res = await fetch(`${API_BASE}/discussions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...input, sentiment: "positive", status: "active" }),
  });
  if (!res.ok) throw new Error(`Failed to create post (${res.status})`);
  const d = await res.json() as ApiDiscussion;
  return toMobilePost(d);
}

/** Single lesson by ID (found within any study) */
export async function fetchLessonFromStudy(
  studyId: string,
  lessonId: string,
): Promise<MobileStudyLesson | undefined> {
  const detail = await get<ApiStudy & { lessons: ApiLesson[] }>(`/bible-studies/${studyId}`);
  const lesson = (detail.lessons ?? []).find((l) => l.id === lessonId);
  if (!lesson) return undefined;
  return toMobileLesson(lesson, detail.title);
}

/** Featured series — the first active study (for the Sermons tab hero card) */
export async function fetchFeaturedSeries(): Promise<SermonSeries | null> {
  try {
    const res = await get<PaginatedResponse<ApiStudy>>("/bible-studies", {
      status: "active",
      limit: "1",
    });
    const s = res.items[0];
    if (!s) return null;
    return {
      id: s.id,
      title: s.title,
      description: s.description ?? "",
      parts: s.lessonCount,
      thumbnail: s.coverImageUrl ?? FALLBACK_STUDY,
      speaker: s.leader ?? "Church Staff",
    };
  } catch {
    return null;
  }
}
