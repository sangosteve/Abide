import { Router } from "express";
import { validateBody } from "../../middleware/validate";
import { insertEventSchema, updateEventSchema } from "@workspace/db";
import * as controller from "./events.controller";

const router = Router();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", validateBody(insertEventSchema), controller.create);
router.patch("/:id", validateBody(updateEventSchema), controller.update);
router.delete("/:id", controller.remove);

export default router;
