import { db, usersTable } from "@workspace/db";
import { eq, ilike, and, desc, count, or } from "drizzle-orm";
import type { InsertUser, UpdateUser } from "@workspace/db";
import { NotFoundError } from "../../middleware/error-handler";

export interface ListUsersOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive" | "pending";
  role?: string;
}

export async function listUsers(opts: ListUsersOptions = {}) {
  const { page = 1, limit = 20, search, status, role } = opts;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (search) {
    conditions.push(
      or(
        ilike(usersTable.firstName, `%${search}%`),
        ilike(usersTable.lastName, `%${search}%`),
        ilike(usersTable.email, `%${search}%`),
      ),
    );
  }
  if (status) conditions.push(eq(usersTable.status, status));
  if (role) conditions.push(eq(usersTable.role, role as "member" | "group_leader" | "ministry_leader" | "worship_team" | "staff" | "admin"));

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [items, totals] = await Promise.all([
    db
      .select()
      .from(usersTable)
      .where(where)
      .orderBy(desc(usersTable.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ total: count() }).from(usersTable).where(where),
  ]);

  const total = Number(totals[0]?.total ?? 0);
  return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getUser(id: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));
  if (!user) throw new NotFoundError("User not found");
  return user;
}

export async function createUser(data: InsertUser) {
  const [user] = await db.insert(usersTable).values(data).returning();
  return user!;
}

export async function updateUser(id: string, data: UpdateUser) {
  const [user] = await db
    .update(usersTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(usersTable.id, id))
    .returning();
  if (!user) throw new NotFoundError("User not found");
  return user;
}

export async function deleteUser(id: string) {
  const [deleted] = await db
    .delete(usersTable)
    .where(eq(usersTable.id, id))
    .returning({ id: usersTable.id });
  if (!deleted) throw new NotFoundError("User not found");
}
