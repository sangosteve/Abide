import type { Request, Response, NextFunction } from "express";
import * as service from "./discussions.service";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, search, status, type } = req.query as Record<string, string>;
    const result = await service.listDiscussions({
      page: page ? Number(page) : 1,
      limit: limit ? Math.min(Number(limit), 100) : 20,
      search: search || undefined,
      status: status as "active" | "pending" | "flagged" | "resolved" | "removed" | undefined,
      type: type as "general" | "prayer_request" | "announcement" | undefined,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const discussion = await service.getDiscussion(req.params.id!);
    res.json(discussion);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const discussion = await service.createDiscussion(req.body);
    res.status(201).json(discussion);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const discussion = await service.updateDiscussion(req.params.id!, req.body);
    res.json(discussion);
  } catch (err) {
    next(err);
  }
}

export async function moderate(req: Request, res: Response, next: NextFunction) {
  try {
    const { action } = req.body as { action: "approve" | "flag" | "resolve" | "remove" };
    const discussion = await service.moderateDiscussion(req.params.id!, action);
    res.json(discussion);
  } catch (err) {
    next(err);
  }
}

export async function report(req: Request, res: Response, next: NextFunction) {
  try {
    const discussion = await service.incrementReports(req.params.id!);
    res.json(discussion);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deleteDiscussion(req.params.id!);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
