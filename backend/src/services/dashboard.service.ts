import prisma from "../lib/prisma";
import { BugStatus, Priority } from "@prisma/client";

export const getDashboard = async () => {
  const [
    totalUsers,
    activeUsers,
    totalProjects,
    activeProjects,
    totalBugs,
    newBugs,
    assignedBugs,
    inProgressBugs,
    resolvedBugs,
    verifiedBugs,
    reopenedBugs,
    closedBugs,
    criticalBugs,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.user.count({
      where: {
        isActive: true,
      },
    }),

    prisma.project.count(),

    prisma.project.count({
      where: {
        isActive: true,
      },
    }),

    prisma.bug.count(),

    prisma.bug.count({
      where: {
        status: BugStatus.NEW,
      },
    }),

    prisma.bug.count({
      where: {
        status: BugStatus.ASSIGNED,
      },
    }),

    prisma.bug.count({
      where: {
        status: BugStatus.IN_PROGRESS,
      },
    }),

    prisma.bug.count({
      where: {
        status: BugStatus.RESOLVED,
      },
    }),

    prisma.bug.count({
      where: {
        status: BugStatus.VERIFIED,
      },
    }),

    prisma.bug.count({
      where: {
        status: BugStatus.REOPENED,
      },
    }),

    prisma.bug.count({
      where: {
        status: BugStatus.CLOSED,
      },
    }),

    prisma.bug.count({
      where: {
        priority: Priority.CRITICAL,
      },
    }),
  ]);

  return {
    totalUsers,
    activeUsers,
    totalProjects,
    activeProjects,
    totalBugs,
    newBugs,
    assignedBugs,
    inProgressBugs,
    resolvedBugs,
    verifiedBugs,
    reopenedBugs,
    closedBugs,
    criticalBugs,
  };
};
