import { Request, Response } from "express";
import { getReports } from "../services/report.service";

export const getReportsCont = async (req: Request, res: Response) => {
  try {
    const reports = await getReports();

    return res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
