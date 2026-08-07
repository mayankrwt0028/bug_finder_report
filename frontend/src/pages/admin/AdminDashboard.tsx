import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import FolderIcon from "@mui/icons-material/Folder";
import BugReportIcon from "@mui/icons-material/BugReport";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AssignmentIcon from "@mui/icons-material/Assignment";
import VerifiedIcon from "@mui/icons-material/Verified";
import DashboardCards from "../../component/dashboard/DashboardCards";
import { getDashboard } from "../../services/dashboard.service";

import DashboardHeader from "../../component/dashboard/DashboardHeader";

import RecentBugTable from "../../component/dashboard/RecentBugTable";

interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  activeProjects: number;
  totalBugs: number;
  newBugs: number;
  assignedBugs: number;
  inProgressBugs: number;
  resolvedBugs: number;
  verifiedBugs: number;
  reopenedBugs: number;
  closedBugs: number;
  criticalBugs: number;
}

const AdminDashboard = () => {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <Box
  sx={{
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
        <CircularProgress />
      </Box>
    );
  }


  const adminCards = dashboard
  ? [
      {
        title: "Users",
        value: dashboard.totalUsers,
        icon: <PeopleIcon />,
      },
      {
        title: "Projects",
        value: dashboard.totalProjects,
        icon: <FolderIcon />,
      },
      {
        title: "Total Bugs",
        value: dashboard.totalBugs,
        icon: <BugReportIcon />,
      },
      {
        title: "Critical",
        value: dashboard.criticalBugs,
        icon: <WarningAmberIcon />,
      },
      {
        title: "New",
        value: dashboard.newBugs,
        icon: <BugReportIcon />,
      },
      {
        title: "Assigned",
        value: dashboard.assignedBugs,
        icon: <AssignmentIcon />,
      },
      {
        title: "In Progress",
        value: dashboard.inProgressBugs,
        icon: <AutorenewIcon />,
      },
      {
        title: "Resolved",
        value: dashboard.resolvedBugs,
        icon: <VerifiedIcon />,
      },
      {
        title: "Verified",
        value: dashboard.verifiedBugs,
        icon: <VerifiedIcon />,
      },
      {
        title: "Reopened",
        value: dashboard.reopenedBugs,
        icon: <AutorenewIcon />,
      },
      {
        title: "Closed",
        value: dashboard.closedBugs,
        icon: <VerifiedIcon />,
      },
    ]
  : [];

  return (
  <Container maxWidth="xl">
    <DashboardHeader
      title="Admin Dashboard"
      subtitle="Welcome back, Admin 👋"
    />

    {dashboard && (
      <>
    <DashboardCards cards={adminCards} />
        <RecentBugTable />
      </>
    )}
  </Container>
);
}
export default AdminDashboard