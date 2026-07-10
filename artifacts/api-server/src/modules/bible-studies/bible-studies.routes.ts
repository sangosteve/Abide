import { Router } from "express";
import { validateBody } from "../../middleware/validate";
import {
  insertBibleStudySchema,
  updateBibleStudySchema,
  insertLessonSchema,
  updateLessonSchema,
} from "@workspace/db";
import * as controller from "./bible-studies.controller";

const router = Router();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", validateBody(insertBibleStudySchema), controller.create);
router.patch("/:id", validateBody(updateBibleStudySchema), controller.update);
router.delete("/:id", controller.remove);

// Lessons sub-resource
router.post(
  "/:studyId/lessons",
  validateBody(insertLessonSchema.omit({ studyId: true })),
  controller.addLesson,
);
router.patch(
  "/:studyId/lessons/:lessonId",
  validateBody(updateLessonSchema),
  controller.updateLesson,
);
router.delete("/:studyId/lessons/:lessonId", controller.deleteLesson);

export default router;
