import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { Role } from "@prisma/client";
import { assignBugController, createBug, deleteBugCont, getAllBugscont, getBugByIdCont, updateBugCont, updateBugStatusCont } from "../controllers/bug.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(Role.QA),
  createBug
);


router.get("/", authMiddleware,getAllBugscont)

router.get(
  "/:id",
  authMiddleware,
  getBugByIdCont
);

router.patch("/assign", authMiddleware, roleMiddleware(Role.MANAGER),assignBugController)

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(Role.QA),
  updateBugCont
);

router.patch(
  "/status/:id",
  authMiddleware,
  updateBugStatusCont
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(Role.MANAGER),
  deleteBugCont
);
export default router;

