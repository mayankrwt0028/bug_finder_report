import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  assignBug,
  CreateNewBug,
  deleteBug,
  getAllBugs,
  getBugById,
  updateBug,
  updateBugStatus,
} from "../services/bug.service";
import prisma from "../lib/prisma";

export const createBug = async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      description,
      priority,
      severity,
      reproducibility,
      projectId,
      assignedToId,
    } = req.body;

    const bug = await CreateNewBug({
      title,
      description,
      priority,
      severity,
      reproducibility,
      projectId,
      assignedToId,
      createdById: req.userId!,
    });

    return res.status(201).json({
      success: true,
      message: "Bug created successfully",
      bug,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const assignBugController = async (req: AuthRequest, res: Response) => {
  try {
    const { bugId, assignToId } = req.body;

    const bug = await assignBug(bugId, assignToId);
    res.status(200).json({
      succes: true,
      message: "bug assigned succesfully",
      bug,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBugscont = async (req: AuthRequest, res: Response) => {
  try {
    const result = await getAllBugs(req.params);
    return res.status(200).json({
      ssuccess: true,
      data: result.bugs,
      pagination: result.pagination,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBugCont = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const { title, description, priority, severity, reproducibility } =
      req.body;

    const bug = await updateBug(id, {
      title,
      description,
      priority,
      severity,
      reproducibility,
    });

    return res.status(200).json({
      success: true,
      message: "bug updated succesfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBugStatusCont = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;
    const bug = await updateBugStatus(id, status);

    return res.status(200).json({
      success: true,
      message: "Bug Status updated successfully",
      bug,
    });
  } catch (error: any) {
    return res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};

export const deleteBugCont = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const bug = await deleteBug(id);
    return res.status(200).json({
      succes: true,
      message: "bug deleted succesfully",
      bug,
    });
  } catch (error: any) {
    return res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};

export const getBugByIdCont = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const bug = await getBugById(id);
    return res.status(200).json({
      success: true,
      bug,
    });
  } catch (error: any) {
    return res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};
