import prisma from "../lib/prisma";

export const createActivity = async (
  bugId: string,
  userId: string,
  action: string,
) => {
  return await prisma.activityLog.create({
    data: {
      bugId,
      userId,
      action,
    },
  });
};

export const getActivities = async (bugId: string) => {
  return await prisma.activityLog.findMany({
    where: {
      bugId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};
