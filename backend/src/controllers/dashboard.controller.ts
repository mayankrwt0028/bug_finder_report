import { Response } from "express";
import { getDashboard } from "../services/dashboard.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const getDashboardCont = async (req: AuthRequest, res: Response) => {
  try {
    const dashboard = await getDashboard();

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
