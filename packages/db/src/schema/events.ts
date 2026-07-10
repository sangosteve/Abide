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

export const recurrenceEnum = pgEnum("recurrence", [
  "none",
  "weekly",
  "monthly",
]);

export const rsvpTypeEnum = pgEnum("rsvp_type", [
  "open",
  "approval_required",
  "invite_only",
]);

export const eventVisibilityEnum = pgEnum("event_visibility", [
  "public",
  "members_only",
  "private",
]);

export const eventPublishStatusEnum = pgEnum("event_publish_status", [
  "draft",
  "published",
  "cancelled",
]);

export const eventsTable = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }),
  host: varchar("host", { length: 100 }),
  date: date("date").notNull(),
  time: varchar("time", { length: 8 }),
  recurrence: recurrenceEnum("recurrence").notNull().default("none"),
  venue: varchar("venue", { length: 255 }),
  address: text("address"),
  isOnline: boolean("is_online").notNull().default(false),
  description: text("description"),
  capacity: integer("capacity"),
  rsvpType: rsvpTypeEnum("rsvp_type").notNull().default("open"),
  requireRsvp: boolean("require_rsvp").notNull().default(false),
  waitlistEnabled: boolean("waitlist_enabled").notNull().default(false),
  bannerUrl: text("banner_url"),
  visibility: eventVisibilityEnum("visibility").notNull().default("public"),
  publishStatus: eventPublishStatusEnum("publish_status")
    .notNull()
    .default("draft"),
  registrations: integer("registrations").notNull().default(0),
  checkIns: integer("check_ins").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertEventSchema = createInsertSchema(eventsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  registrations: true,
  checkIns: true,
});
export const updateEventSchema = insertEventSchema.partial();
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;
export type Event = typeof eventsTable.$inferSelect;
