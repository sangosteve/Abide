/**
 * Typed API client for the Abide backend.
 * Base URL: /api — resolved by Replit's path-based proxy to the API server.
 */

const BASE = "/api";

async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...init.headers },
    ...init,
  });

  if (!res.ok) {
    let message = `Request failed: ${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      message = body.error ?? message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  if (res.status === 204) return undefined as unknown as T;
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (path: string) => request<void>(path, { method: "DELETE" }),
};

// ── Shared types ──────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ── Users ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: "member" | "group_leader" | "ministry_leader" | "worship_team" | "staff" | "admin";
  group: string | null;
  campus: string | null;
  status: "active" | "inactive" | "pending";
  memberSince: string | null;
  notes: string | null;
  photoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUserInput = Partial<CreateUserInput>;

export const usersApi = {
  list: (params?: Record<string, string>) => {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return api.get<PaginatedResponse<User>>(`/users${q}`);
  },
  get: (id: string) => api.get<User>(`/users/${id}`),
  create: (body: CreateUserInput) => api.post<User>("/users", body),
  update: (id: string, body: UpdateUserInput) =>
    api.patch<User>(`/users/${id}`, body),
  delete: (id: string) => api.delete(`/users/${id}`),
};

// ── Sermons ───────────────────────────────────────────────────────────────────

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  series: string | null;
  scripture: string | null;
  date: string;
  duration: number | null;
  summary: string | null;
  mediaStatus: "none" | "processing" | "ready";
  publishStatus: "draft" | "scheduled" | "published";
  views: number;
  featuredOnHomepage: boolean;
  notifyMembers: boolean;
  videoUrl: string | null;
  audioUrl: string | null;
  thumbnailUrl: string | null;
  visibility: "public" | "members_only" | "private";
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateSermonInput = Omit<Sermon, "id" | "views" | "createdAt" | "updatedAt">;
export type UpdateSermonInput = Partial<CreateSermonInput>;

export const sermonsApi = {
  list: (params?: Record<string, string>) => {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return api.get<PaginatedResponse<Sermon>>(`/sermons${q}`);
  },
  get: (id: string) => api.get<Sermon>(`/sermons/${id}`),
  create: (body: CreateSermonInput) => api.post<Sermon>("/sermons", body),
  update: (id: string, body: UpdateSermonInput) =>
    api.patch<Sermon>(`/sermons/${id}`, body),
  delete: (id: string) => api.delete(`/sermons/${id}`),
};

// ── Bible Studies ─────────────────────────────────────────────────────────────

export interface BibleStudy {
  id: string;
  title: string;
  series: string | null;
  leader: string | null;
  studyType: "in_person" | "online" | "hybrid";
  description: string | null;
  startDate: string | null;
  endDate: string | null;
  lessonCount: number;
  visibility: "public" | "members_only" | "private";
  status: "draft" | "active" | "completed" | "archived";
  coverImageUrl: string | null;
  participants: number;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  studyId: string;
  title: string;
  scripture: string | null;
  duration: number | null;
  status: "draft" | "published";
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateBibleStudyInput = Omit<BibleStudy, "id" | "createdAt" | "updatedAt">;
export type UpdateBibleStudyInput = Partial<CreateBibleStudyInput>;

export interface CreateLessonInput {
  title: string;
  scripture?: string | null;
  duration?: number | null;
  status?: "draft" | "published";
  orderIndex?: number;
  shortTitle?: string | null;
  scriptureText?: string | null;
  thumbnailUrl?: string | null;
  keyThought?: string | null;
  teachingNotes?: string | null;
  prayerPoint?: string | null;
  reflectionQuestions?: string[] | null;
}
export type UpdateLessonInput = Partial<CreateLessonInput>;

export const bibleStudiesApi = {
  list: (params?: Record<string, string>) => {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return api.get<PaginatedResponse<BibleStudy>>(`/bible-studies${q}`);
  },
  get: (id: string) =>
    api.get<BibleStudy & { lessons: Lesson[] }>(`/bible-studies/${id}`),
  create: (body: CreateBibleStudyInput) =>
    api.post<BibleStudy>("/bible-studies", body),
  update: (id: string, body: UpdateBibleStudyInput) =>
    api.patch<BibleStudy>(`/bible-studies/${id}`, body),
  delete: (id: string) => api.delete(`/bible-studies/${id}`),
  // Lesson sub-resource
  addLesson: (studyId: string, body: CreateLessonInput) =>
    api.post<Lesson>(`/bible-studies/${studyId}/lessons`, body),
  updateLesson: (studyId: string, lessonId: string, body: UpdateLessonInput) =>
    api.patch<Lesson>(`/bible-studies/${studyId}/lessons/${lessonId}`, body),
  deleteLesson: (studyId: string, lessonId: string) =>
    api.delete(`/bible-studies/${studyId}/lessons/${lessonId}`),
};

// ── Events ────────────────────────────────────────────────────────────────────

export interface Event {
  id: string;
  title: string;
  category: string | null;
  host: string | null;
  date: string;
  time: string | null;
  recurrence: "none" | "weekly" | "monthly";
  venue: string | null;
  address: string | null;
  isOnline: boolean;
  description: string | null;
  capacity: number | null;
  rsvpType: "open" | "approval_required" | "invite_only";
  requireRsvp: boolean;
  waitlistEnabled: boolean;
  bannerUrl: string | null;
  visibility: "public" | "members_only" | "private";
  publishStatus: "draft" | "published" | "cancelled";
  registrations: number;
  checkIns: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateEventInput = Omit<Event, "id" | "registrations" | "checkIns" | "createdAt" | "updatedAt">;
export type UpdateEventInput = Partial<CreateEventInput>;

export const eventsApi = {
  list: (params?: Record<string, string>) => {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return api.get<PaginatedResponse<Event>>(`/events${q}`);
  },
  get: (id: string) => api.get<Event>(`/events/${id}`),
  create: (body: CreateEventInput) => api.post<Event>("/events", body),
  update: (id: string, body: UpdateEventInput) =>
    api.patch<Event>(`/events/${id}`, body),
  delete: (id: string) => api.delete(`/events/${id}`),
};

// ── Discussions ───────────────────────────────────────────────────────────────

export interface Discussion {
  id: string;
  title: string;
  authorName: string;
  group: string | null;
  type: "general" | "prayer_request" | "announcement";
  replies: number;
  reports: number;
  sentiment: "positive" | "neutral" | "negative";
  status: "active" | "pending" | "flagged" | "resolved" | "removed";
  content: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateDiscussionInput = Omit<Discussion, "id" | "replies" | "reports" | "createdAt" | "updatedAt">;
export type UpdateDiscussionInput = Partial<CreateDiscussionInput>;

export const discussionsApi = {
  list: (params?: Record<string, string>) => {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return api.get<PaginatedResponse<Discussion>>(`/discussions${q}`);
  },
  get: (id: string) => api.get<Discussion>(`/discussions/${id}`),
  create: (body: CreateDiscussionInput) =>
    api.post<Discussion>("/discussions", body),
  update: (id: string, body: UpdateDiscussionInput) =>
    api.patch<Discussion>(`/discussions/${id}`, body),
  moderate: (id: string, action: "approve" | "flag" | "resolve" | "remove") =>
    api.post<Discussion>(`/discussions/${id}/moderate`, { action }),
  report: (id: string) => api.post<Discussion>(`/discussions/${id}/report`, {}),
  delete: (id: string) => api.delete(`/discussions/${id}`),
};
