import { Router } from "express";
import { Role } from "@prisma/client";

import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

import { getDashboardCont } from "../controllers/dashboard.controller";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware(Role.ADMIN, Role.MANAGER, Role.QA, Role.DEVELOPER),
  getDashboardCont,
);

export default router;
