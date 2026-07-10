import type { Request, Response, NextFunction } from "express";
import * as service from "./users.service";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, search, status, role } = req.query as Record<string, string>;
    const result = await service.listUsers({
      page: page ? Number(page) : 1,
      limit: limit ? Math.min(Number(limit), 100) : 20,
      search: search || undefined,
      status: status as "active" | "inactive" | "pending" | undefined,
      role: role || undefined,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await service.getUser(req.params.id!);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await service.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await service.updateUser(req.params.id!, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deleteUser(req.params.id!);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
