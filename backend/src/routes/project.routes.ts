import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { Role } from "@prisma/client";
import { createProject, getProjectById } from "../services/project.service";
import { CreateNewBug } from "../services/bug.service";
import { createBug } from "../controllers/bug.controller";
import { createProjectController, getAllProjectsCont, getProjectByIdCont, updateProjectCont } from "../controllers/project.controller";

const router = Router();

router.post("/", authMiddleware, roleMiddleware(Role.ADMIN, Role.MANAGER, Role.QA), createProjectController)



router.get("/",authMiddleware, getAllProjectsCont)

router.get("/:id", authMiddleware,getProjectByIdCont)

router.put("/:id", authMiddleware, roleMiddleware(Role.ADMIN, Role.MANAGER),updateProjectCont)

export default router;

