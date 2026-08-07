import { useEffect, useState } from "react";
import { Container, CircularProgress, Box } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import VerifiedIcon from "@mui/icons-material/Verified";
import DashboardHeader from "../../component/dashboard/DashboardHeader";
import DashboardCards from "../../component/dashboard/DashboardCards";
import RecentBugTable from "../../component/dashboard/RecentBugTable";
import { getDashboard } from "../../services/dashboard.service";

const ManagerDashboard = () => {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setDashboard(res.data);
    } catch (err) {
      console.log(err);
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
  const managerCards = dashboard
    ? [
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
      ]
    : [];
  return (
    <Container maxWidth="xl">
      <DashboardHeader
        title="Manager Dashboard"
        subtitle="Manage bugs and assign developers"
      />

      {dashboard && (
        <>
          <DashboardCards cards={managerCards} />

          <RecentBugTable />
        </>
      )}
    </Container>
  );
};

export default ManagerDashboard;
