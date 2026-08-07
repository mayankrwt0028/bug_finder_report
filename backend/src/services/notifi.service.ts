import prisma from "../lib/prisma";
export const getNotifications = async (userId: string) => {
  return await prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const markAsRead = async (id: string, userId: string) => {
  const notification = await prisma.notification.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  return await prisma.notification.update({
    where: {
      id,
    },
    data: {
      isRead: true,
    },
  });
};

export const createNotification = async (
  userId: string,
  title: string,
  message: string,
) => {
  return await prisma.notification.create({
    data: {
      userId,
      title,
      message,
    },
  });
};
