import { Router } from "express";
import { validateBody } from "../../middleware/validate";
import { insertUserSchema, updateUserSchema } from "@workspace/db";
import * as controller from "./users.controller";

const router = Router();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", validateBody(insertUserSchema), controller.create);
router.patch("/:id", validateBody(updateUserSchema), controller.update);
router.delete("/:id", controller.remove);

export default router;
