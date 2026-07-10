import { db, eventsTable } from "@workspace/db";
import { eq, ilike, and, desc, count, or, gte } from "drizzle-orm";
import type { InsertEvent, UpdateEvent } from "@workspace/db";
import { NotFoundError } from "../../middleware/error-handler";

export interface ListEventsOptions {
  page?: number;
  limit?: number;
  search?: string;
  publishStatus?: "draft" | "published" | "cancelled";
  upcoming?: boolean;
}

export async function listEvents(opts: ListEventsOptions = {}) {
  const { page = 1, limit = 20, search, publishStatus, upcoming } = opts;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (search) {
    conditions.push(
      or(
        ilike(eventsTable.title, `%${search}%`),
        ilike(eventsTable.category, `%${search}%`),
        ilike(eventsTable.host, `%${search}%`),
      ),
    );
  }
  if (publishStatus) conditions.push(eq(eventsTable.publishStatus, publishStatus));
  if (upcoming) {
    const today = new Date().toISOString().split("T")[0]!;
    conditions.push(gte(eventsTable.date, today));
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [items, totals] = await Promise.all([
    db
      .select()
      .from(eventsTable)
      .where(where)
      .orderBy(desc(eventsTable.date))
      .limit(limit)
      .offset(offset),
    db.select({ total: count() }).from(eventsTable).where(where),
  ]);

  const total = Number(totals[0]?.total ?? 0);
  return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getEvent(id: string) {
  const [event] = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.id, id));
  if (!event) throw new NotFoundError("Event not found");
  return event;
}

export async function createEvent(data: InsertEvent) {
  const [event] = await db.insert(eventsTable).values(data).returning();
  return event!;
}

export async function updateEvent(id: string, data: UpdateEvent) {
  const [event] = await db
    .update(eventsTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(eventsTable.id, id))
    .returning();
  if (!event) throw new NotFoundError("Event not found");
  return event;
}

export async function deleteEvent(id: string) {
  const [deleted] = await db
    .delete(eventsTable)
    .where(eq(eventsTable.id, id))
    .returning({ id: eventsTable.id });
  if (!deleted) throw new NotFoundError("Event not found");
}
