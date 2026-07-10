import type { Request, Response, NextFunction } from "express";
import { ValidationError } from "./error-handler";

type SafeParseable = {
  safeParse(data: unknown): { success: true; data: unknown } | { success: false; error: { issues: unknown[] } };
};

export function validateBody(schema: SafeParseable) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(
        new ValidationError("Validation failed", (result as { success: false; error: { issues: unknown[] } }).error.issues),
      );
    }
    req.body = (result as { success: true; data: unknown }).data;
    next();
  };
}

export function validateQuery(schema: SafeParseable) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return next(
        new ValidationError(
          "Invalid query parameters",
          (result as { success: false; error: { issues: unknown[] } }).error.issues,
        ),
      );
    }
    (req as Request & { validatedQuery: unknown }).validatedQuery = (result as { success: true; data: unknown }).data;
    next();
  };
}
