import { Router } from "express";
import { Role } from "@prisma/client";

import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

import { getReportsCont } from "../controllers/report.controller";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware(Role.ADMIN, Role.MANAGER),
  getReportsCont,
);

export default router;
