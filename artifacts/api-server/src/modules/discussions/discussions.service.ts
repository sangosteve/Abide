import { db, discussionsTable } from "@workspace/db";
import { eq, ilike, and, desc, count, or, sql } from "drizzle-orm";
import type { InsertDiscussion, UpdateDiscussion } from "@workspace/db";
import { NotFoundError } from "../../middleware/error-handler";

export interface ListDiscussionsOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "pending" | "flagged" | "resolved" | "removed";
  type?: "general" | "prayer_request" | "announcement";
}

export async function listDiscussions(opts: ListDiscussionsOptions = {}) {
  const { page = 1, limit = 20, search, status, type } = opts;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (search) {
    conditions.push(
      or(
        ilike(discussionsTable.title, `%${search}%`),
        ilike(discussionsTable.authorName, `%${search}%`),
      ),
    );
  }
  if (status) conditions.push(eq(discussionsTable.status, status));
  if (type) conditions.push(eq(discussionsTable.type, type));

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [items, totals] = await Promise.all([
    db
      .select()
      .from(discussionsTable)
      .where(where)
      .orderBy(desc(discussionsTable.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ total: count() }).from(discussionsTable).where(where),
  ]);

  const total = Number(totals[0]?.total ?? 0);
  return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getDiscussion(id: string) {
  const [discussion] = await db
    .select()
    .from(discussionsTable)
    .where(eq(discussionsTable.id, id));
  if (!discussion) throw new NotFoundError("Discussion not found");
  return discussion;
}

export async function createDiscussion(data: InsertDiscussion) {
  const [discussion] = await db
    .insert(discussionsTable)
    .values(data)
    .returning();
  return discussion!;
}

export async function updateDiscussion(id: string, data: UpdateDiscussion) {
  const [discussion] = await db
    .update(discussionsTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(discussionsTable.id, id))
    .returning();
  if (!discussion) throw new NotFoundError("Discussion not found");
  return discussion;
}

export async function moderateDiscussion(
  id: string,
  action: "approve" | "flag" | "resolve" | "remove",
) {
  const statusMap: Record<typeof action, "active" | "flagged" | "resolved" | "removed"> = {
    approve: "active",
    flag: "flagged",
    resolve: "resolved",
    remove: "removed",
  };
  return updateDiscussion(id, { status: statusMap[action] });
}

export async function incrementReports(id: string) {
  const [discussion] = await db
    .update(discussionsTable)
    .set({
      reports: sql`${discussionsTable.reports} + 1`,
      status: "flagged",
      updatedAt: new Date(),
    })
    .where(eq(discussionsTable.id, id))
    .returning();
  if (!discussion) throw new NotFoundError("Discussion not found");
  return discussion;
}

export async function deleteDiscussion(id: string) {
  const [deleted] = await db
    .delete(discussionsTable)
    .where(eq(discussionsTable.id, id))
    .returning({ id: discussionsTable.id });
  if (!deleted) throw new NotFoundError("Discussion not found");
}
