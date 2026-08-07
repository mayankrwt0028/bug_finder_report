import prisma from "../lib/prisma";

export const createComment = async (data: {
  message: string;
  bugId: string;
  userId: string;
}) => {
  const { message, bugId, userId } = data;

  if (!message || !bugId || !userId) {
    throw new Error("All field are required");
  }

  const findbugId = await prisma.bug.findUnique({
    where: {
      id: bugId,
    },
  });
  if (!findbugId) {
    throw new Error("Bug Id not found");
  }

  const findUserId = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!findUserId) {
    throw new Error("user not Found");
  }

  const Comment = await prisma.comment.create({
    data: {
      message,
      bugId,
      userId,
    },
  });
  return Comment;
};

export const getAllCommentById = async (id: string) => {
  if (!id) {
    throw new Error("Bug id is required");
  }

  const bug = await prisma.bug.findUnique({
    where: {
      id: id,
    },
  });
  if (!bug) {
    throw new Error("bug Id not found");
  }

  const comment = await prisma.comment.findMany({
    where: {
      bugId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return comment;
};

export const updateComment = async (
  id: string,
  data: {
    message: string;
    userId: string;
    bugId: string;
  },
) => {
  const { message, userId, bugId } = data;

  const comment = await prisma.comment.findUnique({
    where: { id },
  });
  if (!comment) {
    throw new Error("bug not found");
  }
  const updateComment = await prisma.comment.update({
    where: { id },
    data: {
      message,
    },
  });
  return updateComment;
};

export const deleteComment = async (id: string) => {
  if (!id) {
    throw new Error("Delete id is missing");
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });
  if (!comment) {
    throw new Error("comment not found");
  }

  const deleteComment = await prisma.comment.delete({
    where: {
      id,
    },
  });
  return deleteComment;
};
