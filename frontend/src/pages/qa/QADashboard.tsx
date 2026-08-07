import { useEffect, useState } from "react";
import { Container, CircularProgress, Box } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import VerifiedIcon from "@mui/icons-material/Verified";
import DashboardHeader from "../../component/dashboard/DashboardHeader";
import DashboardCards from "../../component/dashboard/DashboardCards";
import RecentBugTable from "../../component/dashboard/RecentBugTable";
import { getDashboard } from "../../services/dashboard.service";

const QADashboard = () => {
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
  const qaCards = dashboard
    ? [
        {
          title: "New Bugs",
          value: dashboard.newBugs,
          icon: <BugReportIcon />,
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
          title: "Total Bugs",
          value: dashboard.totalBugs,
          icon: <BugReportIcon />,
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
          <DashboardCards cards={qaCards} />

          <RecentBugTable />
        </>
      )}
    </Container>
  );
};

export default QADashboard;
