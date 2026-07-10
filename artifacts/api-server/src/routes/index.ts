import { Router, type IRouter } from "express";
import healthRouter from "./health";
import usersRouter from "../modules/users/users.routes";
import sermonsRouter from "../modules/sermons/sermons.routes";
import bibleStudiesRouter from "../modules/bible-studies/bible-studies.routes";
import eventsRouter from "../modules/events/events.routes";
import discussionsRouter from "../modules/discussions/discussions.routes";
import uploadsRouter from "../modules/uploads/uploads.routes";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/users", usersRouter);
router.use("/sermons", sermonsRouter);
router.use("/bible-studies", bibleStudiesRouter);
router.use("/events", eventsRouter);
router.use("/discussions", discussionsRouter);
router.use("/upload", uploadsRouter);

export default router;
