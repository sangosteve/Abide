import type { Request, Response, NextFunction } from "express";
import * as service from "./bible-studies.service";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, search, status } = req.query as Record<string, string>;
    const result = await service.listBibleStudies({
      page: page ? Number(page) : 1,
      limit: limit ? Math.min(Number(limit), 100) : 20,
      search: search || undefined,
      status: status as "draft" | "active" | "completed" | "archived" | undefined,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const study = await service.getBibleStudy(req.params.id!);
    res.json(study);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const study = await service.createBibleStudy(req.body);
    res.status(201).json(study);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const study = await service.updateBibleStudy(req.params.id!, req.body);
    res.json(study);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deleteBibleStudy(req.params.id!);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// Lessons
export async function addLesson(req: Request, res: Response, next: NextFunction) {
  try {
    const lesson = await service.addLesson(req.params.studyId!, req.body);
    res.status(201).json(lesson);
  } catch (err) {
    next(err);
  }
}

export async function updateLesson(req: Request, res: Response, next: NextFunction) {
  try {
    const lesson = await service.updateLesson(req.params.lessonId!, req.body);
    res.json(lesson);
  } catch (err) {
    next(err);
  }
}

export async function deleteLesson(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deleteLesson(req.params.lessonId!);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
