import prisma from "../lib/prisma";

export const getReports = async () => {
  const [statusReport, priorityReport, severityReport, developerReport] =
    await Promise.all([
      prisma.bug.groupBy({
        by: ["status"],
        _count: {
          status: true,
        },
      }),

      prisma.bug.groupBy({
        by: ["priority"],
        _count: {
          priority: true,
        },
      }),

      prisma.bug.groupBy({
        by: ["severity"],
        _count: {
          severity: true,
        },
      }),

      prisma.user.findMany({
        where: {
          role: "DEVELOPER",
        },
        select: {
          id: true,
          name: true,
          email: true,
          _count: {
            select: {
              assignedBugs: true,
            },
          },
        },
      }),
    ]);

  return {
    statusReport,
    priorityReport,
    severityReport,
    developerReport,
  };
};
