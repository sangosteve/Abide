import { db, bibleStudiesTable, lessonsTable } from "@workspace/db";
import { eq, ilike, and, desc, count, or, asc } from "drizzle-orm";
import type {
  InsertBibleStudy,
  UpdateBibleStudy,
  InsertLesson,
  UpdateLesson,
} from "@workspace/db";
import { NotFoundError } from "../../middleware/error-handler";

export interface ListBibleStudiesOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: "draft" | "active" | "completed" | "archived";
}

export async function listBibleStudies(opts: ListBibleStudiesOptions = {}) {
  const { page = 1, limit = 20, search, status } = opts;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (search) {
    conditions.push(
      or(
        ilike(bibleStudiesTable.title, `%${search}%`),
        ilike(bibleStudiesTable.leader, `%${search}%`),
      ),
    );
  }
  if (status) conditions.push(eq(bibleStudiesTable.status, status));

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [items, totals] = await Promise.all([
    db
      .select()
      .from(bibleStudiesTable)
      .where(where)
      .orderBy(desc(bibleStudiesTable.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ total: count() }).from(bibleStudiesTable).where(where),
  ]);

  const total = Number(totals[0]?.total ?? 0);
  return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getBibleStudy(id: string) {
  const [study] = await db
    .select()
    .from(bibleStudiesTable)
    .where(eq(bibleStudiesTable.id, id));
  if (!study) throw new NotFoundError("Bible study not found");

  const lessons = await db
    .select()
    .from(lessonsTable)
    .where(eq(lessonsTable.studyId, id))
    .orderBy(asc(lessonsTable.orderIndex));

  return { ...study, lessons };
}

export async function createBibleStudy(data: InsertBibleStudy) {
  const [study] = await db
    .insert(bibleStudiesTable)
    .values(data)
    .returning();
  return study!;
}

export async function updateBibleStudy(id: string, data: UpdateBibleStudy) {
  const [study] = await db
    .update(bibleStudiesTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(bibleStudiesTable.id, id))
    .returning();
  if (!study) throw new NotFoundError("Bible study not found");
  return study;
}

export async function deleteBibleStudy(id: string) {
  const [deleted] = await db
    .delete(bibleStudiesTable)
    .where(eq(bibleStudiesTable.id, id))
    .returning({ id: bibleStudiesTable.id });
  if (!deleted) throw new NotFoundError("Bible study not found");
}

// Lessons
export async function addLesson(studyId: string, data: Omit<InsertLesson, "studyId">) {
  const [study] = await db
    .select({ id: bibleStudiesTable.id })
    .from(bibleStudiesTable)
    .where(eq(bibleStudiesTable.id, studyId));
  if (!study) throw new NotFoundError("Bible study not found");

  const [lesson] = await db
    .insert(lessonsTable)
    .values({ ...data, studyId })
    .returning();
  return lesson!;
}

export async function updateLesson(id: string, data: UpdateLesson) {
  const [lesson] = await db
    .update(lessonsTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(lessonsTable.id, id))
    .returning();
  if (!lesson) throw new NotFoundError("Lesson not found");
  return lesson;
}

export async function deleteLesson(id: string) {
  const [deleted] = await db
    .delete(lessonsTable)
    .where(eq(lessonsTable.id, id))
    .returning({ id: lessonsTable.id });
  if (!deleted) throw new NotFoundError("Lesson not found");
}
