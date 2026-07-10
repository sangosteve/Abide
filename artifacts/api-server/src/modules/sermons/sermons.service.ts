import { db, sermonsTable } from "@workspace/db";
import { eq, ilike, and, desc, count, or } from "drizzle-orm";
import type { InsertSermon, UpdateSermon } from "@workspace/db";
import { NotFoundError } from "../../middleware/error-handler";

export interface ListSermonsOptions {
  page?: number;
  limit?: number;
  search?: string;
  publishStatus?: "draft" | "scheduled" | "published";
  mediaStatus?: "none" | "processing" | "ready";
}

export async function listSermons(opts: ListSermonsOptions = {}) {
  const { page = 1, limit = 20, search, publishStatus, mediaStatus } = opts;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (search) {
    conditions.push(
      or(
        ilike(sermonsTable.title, `%${search}%`),
        ilike(sermonsTable.speaker, `%${search}%`),
        ilike(sermonsTable.series, `%${search}%`),
      ),
    );
  }
  if (publishStatus) conditions.push(eq(sermonsTable.publishStatus, publishStatus));
  if (mediaStatus) conditions.push(eq(sermonsTable.mediaStatus, mediaStatus));

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [items, totals] = await Promise.all([
    db
      .select()
      .from(sermonsTable)
      .where(where)
      .orderBy(desc(sermonsTable.date))
      .limit(limit)
      .offset(offset),
    db.select({ total: count() }).from(sermonsTable).where(where),
  ]);

  const total = Number(totals[0]?.total ?? 0);
  return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getSermon(id: string) {
  const [sermon] = await db
    .select()
    .from(sermonsTable)
    .where(eq(sermonsTable.id, id));
  if (!sermon) throw new NotFoundError("Sermon not found");
  return sermon;
}

export async function createSermon(data: InsertSermon) {
  const [sermon] = await db.insert(sermonsTable).values(data).returning();
  return sermon!;
}

export async function updateSermon(id: string, data: UpdateSermon) {
  const [sermon] = await db
    .update(sermonsTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(sermonsTable.id, id))
    .returning();
  if (!sermon) throw new NotFoundError("Sermon not found");
  return sermon;
}

export async function deleteSermon(id: string) {
  const [deleted] = await db
    .delete(sermonsTable)
    .where(eq(sermonsTable.id, id))
    .returning({ id: sermonsTable.id });
  if (!deleted) throw new NotFoundError("Sermon not found");
}
