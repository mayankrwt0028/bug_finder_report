import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";
import { getActivities } from "../services/activity.service";

export const getBugActivitiesCont = async(
  req:AuthRequest,
  res:Response
)=>{
  try {
    const id=req.params.id as string

    const activitie = await getActivities(id)
res.status(200).json({
      success: true,
      data: activitie,
    });

  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}