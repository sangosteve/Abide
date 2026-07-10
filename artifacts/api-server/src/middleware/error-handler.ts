import type { ErrorRequestHandler } from "express";
import { logger } from "../lib/logger";

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly issues?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(404, message);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Resource already exists") {
    super(409, message);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, issues?: unknown) {
    super(400, message, issues);
  }
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      ...(err.issues != null ? { issues: err.issues } : {}),
    });
    return;
  }

  // Postgres unique violation
  if (err.code === "23505") {
    res.status(409).json({ error: "A record with that value already exists." });
    return;
  }

  logger.error({ err }, "Unhandled error");
  res.status(500).json({ error: "Internal server error" });
};
