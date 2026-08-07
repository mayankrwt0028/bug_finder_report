import { Router } from "express";

import {
  getAllUserCont,
  getUserByIdcont,
  updateUserRoleCont,
  deleteUserCont,
} from "../controllers/user.controller";

import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { Role } from "@prisma/client";

const router = Router();

// Get all users (Only Admin)
router.get(
  "/",
  authMiddleware,
  roleMiddleware(Role.ADMIN, Role.MANAGER),
  getAllUserCont,
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(Role.ADMIN, Role.MANAGER),
  getUserByIdcont,
);

router.put(
  "/:id/role",
  authMiddleware,
  roleMiddleware(Role.ADMIN, Role.MANAGER),
  updateUserRoleCont,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(Role.ADMIN, Role.MANAGER),
  deleteUserCont,
);

export default router;
