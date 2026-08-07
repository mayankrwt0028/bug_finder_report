import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getNotifications, markAsRead } from "../services/notifi.service";

export const getNotificationsCont = async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await getNotifications(req.userId as string);

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const markAsReadCont = async (req: AuthRequest, res: Response) => {
  try {
    const notification = await markAsRead(
      req.params.id as string,
      req.userId as string,
    );

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
