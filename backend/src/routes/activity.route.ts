import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getBugActivitiesCont } from "../controllers/activity.controller";
const router = Router();

router.get("/bug/:id", authMiddleware, getBugActivitiesCont);
export default router;
