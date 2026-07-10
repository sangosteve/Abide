import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
  integer,
  boolean,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const mediaStatusEnum = pgEnum("media_status", [
  "none",
  "processing",
  "ready",
]);

export const sermonPublishStatusEnum = pgEnum("sermon_publish_status", [
  "draft",
  "scheduled",
  "published",
]);

export const sermonVisibilityEnum = pgEnum("sermon_visibility", [
  "public",
  "members_only",
  "private",
]);

export const sermonsTable = pgTable("sermons", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  speaker: varchar("speaker", { length: 100 }).notNull(),
  series: varchar("series", { length: 255 }),
  scripture: varchar("scripture", { length: 255 }),
  date: date("date").notNull(),
  duration: integer("duration"),
  summary: text("summary"),
  mediaStatus: mediaStatusEnum("media_status").notNull().default("none"),
  publishStatus: sermonPublishStatusEnum("publish_status")
    .notNull()
    .default("draft"),
  views: integer("views").notNull().default(0),
  featuredOnHomepage: boolean("featured_on_homepage").notNull().default(false),
  notifyMembers: boolean("notify_members").notNull().default(false),
  videoUrl: text("video_url"),
  audioUrl: text("audio_url"),
  thumbnailUrl: text("thumbnail_url"),
  visibility: sermonVisibilityEnum("visibility").notNull().default("public"),
  scheduledAt: timestamp("scheduled_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertSermonSchema = createInsertSchema(sermonsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  views: true,
});
export const updateSermonSchema = insertSermonSchema.partial();
export type InsertSermon = z.infer<typeof insertSermonSchema>;
export type UpdateSermon = z.infer<typeof updateSermonSchema>;
export type Sermon = typeof sermonsTable.$inferSelect;
