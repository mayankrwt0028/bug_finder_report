import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";
import {
  deleteUser,
  getAllUser,
  getUserById,
  updateUserRole,
} from "../services/user.service";
import { Role } from "@prisma/client";

export const getAllUserCont = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getAllUser();
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserByIdcont = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id as string;
    const user = await getUserById(userId);
    res.status(200).json({
      succes: true,
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserRoleCont = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id as string;
    const { role } = req.body;

    const useer = await updateUserRole(userId, role as Role);
    return res.status(200).json({
      success: true,
      message: "User role is updated",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUserCont = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const user = deleteUser(id);
    res.status(200).json({
      success: true,
      message: "User Deleted Scucesfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
