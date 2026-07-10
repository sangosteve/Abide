import { Router } from "express";
import { validateBody } from "../../middleware/validate";
import { insertSermonSchema, updateSermonSchema } from "@workspace/db";
import * as controller from "./sermons.controller";

const router = Router();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", validateBody(insertSermonSchema), controller.create);
router.patch("/:id", validateBody(updateSermonSchema), controller.update);
router.delete("/:id", controller.remove);

export default router;
