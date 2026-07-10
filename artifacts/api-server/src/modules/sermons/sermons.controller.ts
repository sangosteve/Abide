import type { Request, Response, NextFunction } from "express";
import * as service from "./sermons.service";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, search, publishStatus, mediaStatus } = req.query as Record<string, string>;
    const result = await service.listSermons({
      page: page ? Number(page) : 1,
      limit: limit ? Math.min(Number(limit), 100) : 20,
      search: search || undefined,
      publishStatus: publishStatus as "draft" | "scheduled" | "published" | undefined,
      mediaStatus: mediaStatus as "none" | "processing" | "ready" | undefined,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const sermon = await service.getSermon(req.params.id!);
    res.json(sermon);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const sermon = await service.createSermon(req.body);
    res.status(201).json(sermon);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const sermon = await service.updateSermon(req.params.id!, req.body);
    res.json(sermon);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deleteSermon(req.params.id!);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
