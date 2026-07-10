import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
  integer,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const studyTypeEnum = pgEnum("study_type", [
  "in_person",
  "online",
  "hybrid",
]);

export const studyStatusEnum = pgEnum("study_status", [
  "draft",
  "active",
  "completed",
  "archived",
]);

export const studyVisibilityEnum = pgEnum("study_visibility", [
  "public",
  "members_only",
  "private",
]);

export const lessonStatusEnum = pgEnum("lesson_status", ["draft", "published"]);

export const bibleStudiesTable = pgTable("bible_studies", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  series: varchar("series", { length: 255 }),
  leader: varchar("leader", { length: 100 }),
  studyType: studyTypeEnum("study_type").notNull().default("in_person"),
  description: text("description"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  lessonCount: integer("lesson_count").notNull().default(0),
  visibility: studyVisibilityEnum("visibility")
    .notNull()
    .default("members_only"),
  status: studyStatusEnum("status").notNull().default("draft"),
  coverImageUrl: text("cover_image_url"),
  participants: integer("participants").notNull().default(0),
  progress: integer("progress").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const lessonsTable = pgTable("lessons", {
  id: uuid("id").primaryKey().defaultRandom(),
  studyId: uuid("study_id")
    .notNull()
    .references(() => bibleStudiesTable.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  shortTitle: varchar("short_title", { length: 255 }),
  scripture: varchar("scripture", { length: 255 }),
  scriptureText: text("scripture_text"),
  duration: integer("duration"),
  thumbnailUrl: text("thumbnail_url"),
  keyThought: text("key_thought"),
  teachingNotes: text("teaching_notes"),
  reflectionQuestions: text("reflection_questions"), // JSON-serialised string[]
  prayerPoint: text("prayer_point"),
  status: lessonStatusEnum("status").notNull().default("draft"),
  orderIndex: integer("order_index").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertBibleStudySchema = createInsertSchema(
  bibleStudiesTable,
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateBibleStudySchema = insertBibleStudySchema.partial();
export type InsertBibleStudy = z.infer<typeof insertBibleStudySchema>;
export type UpdateBibleStudy = z.infer<typeof updateBibleStudySchema>;
export type BibleStudy = typeof bibleStudiesTable.$inferSelect;

export const insertLessonSchema = createInsertSchema(lessonsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateLessonSchema = insertLessonSchema.partial();
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type UpdateLesson = z.infer<typeof updateLessonSchema>;
export type Lesson = typeof lessonsTable.$inferSelect;
