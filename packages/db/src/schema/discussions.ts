import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const discussionTypeEnum = pgEnum("discussion_type", [
  "general",
  "prayer_request",
  "announcement",
]);

export const sentimentEnum = pgEnum("sentiment", [
  "positive",
  "neutral",
  "negative",
]);

export const discussionStatusEnum = pgEnum("discussion_status", [
  "active",
  "pending",
  "flagged",
  "resolved",
  "removed",
]);

export const discussionsTable = pgTable("discussions", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 500 }).notNull(),
  authorName: varchar("author_name", { length: 100 }).notNull(),
  group: varchar("group", { length: 100 }),
  type: discussionTypeEnum("type").notNull().default("general"),
  replies: integer("replies").notNull().default(0),
  likes: integer("likes").notNull().default(0),
  reports: integer("reports").notNull().default(0),
  sentiment: sentimentEnum("sentiment").notNull().default("neutral"),
  status: discussionStatusEnum("status").notNull().default("active"),
  content: text("content"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertDiscussionSchema = createInsertSchema(discussionsTable).omit(
  {
    id: true,
    createdAt: true,
    updatedAt: true,
    replies: true,
    reports: true,
  },
);
export const updateDiscussionSchema = insertDiscussionSchema.partial();
export type InsertDiscussion = z.infer<typeof insertDiscussionSchema>;
export type UpdateDiscussion = z.infer<typeof updateDiscussionSchema>;
export type Discussion = typeof discussionsTable.$inferSelect;
