import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../services/project.service";

export const createProjectController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const { name, description } = req.body;

    const project = await createProject({
      name,
      description,
      createdById: req.userId!,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProjectsCont = async (req: AuthRequest, res: Response) => {
  try {
    const projects = await getAllProjects();
    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProjectByIdCont = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const project = await getProjectById(id);
    return res.status(200).json({
      sucess: true,
      project,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//Update Project
export const updateProjectCont = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const { name, description } = req.body;
    const project = await updateProject(id, {
      name,
      description,
    });
    return res.status(200).json({
      success: true,
      message: "project update successfully",
      project,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProjectCont = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const result = await deleteProject(id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
