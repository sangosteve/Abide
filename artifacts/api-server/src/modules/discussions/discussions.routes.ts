import { Router } from "express";
import { validateBody } from "../../middleware/validate";
import { insertDiscussionSchema, updateDiscussionSchema } from "@workspace/db";
import * as controller from "./discussions.controller";

const router = Router();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", validateBody(insertDiscussionSchema), controller.create);
router.patch("/:id", validateBody(updateDiscussionSchema), controller.update);
router.post("/:id/moderate", controller.moderate);
router.post("/:id/report", controller.report);
router.delete("/:id", controller.remove);

export default router;
