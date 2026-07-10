import type { Request, Response, NextFunction } from "express";
import * as service from "./events.service";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, search, publishStatus, upcoming } = req.query as Record<string, string>;
    const result = await service.listEvents({
      page: page ? Number(page) : 1,
      limit: limit ? Math.min(Number(limit), 100) : 20,
      search: search || undefined,
      publishStatus: publishStatus as "draft" | "published" | "cancelled" | undefined,
      upcoming: upcoming === "true",
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const event = await service.getEvent(req.params.id!);
    res.json(event);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const event = await service.createEvent(req.body);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const event = await service.updateEvent(req.params.id!, req.body);
    res.json(event);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deleteEvent(req.params.id!);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
