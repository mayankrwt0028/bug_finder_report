import { Grid } from "@mui/material";
import StatCard from "./StatCard";
import { BugReportOutlined } from "@mui/icons-material";

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

interface Props {
  data: DashboardData;
}

const DashboardCards = ({ data }: Props) => {
  const cards = [
    { title: "Total Users", value: data.totalUsers },
    { title: "Active Users", value: data.activeUsers },
    { title: "Total Projects", value: data.totalProjects },
    { title: "Active Projects", value: data.activeProjects },
    { title: "Total Bugs", value: data.totalBugs },
    { title: "Critical Bugs", value: data.criticalBugs },
    { title: "New", value: data.newBugs },
    { title: "Assigned", value: data.assignedBugs },
    { title: "In Progress", value: data.inProgressBugs },
    { title: "Resolved", value: data.resolvedBugs },
    { title: "Verified", value: data.verifiedBugs },
    { title: "Reopened", value: data.reopenedBugs },
    { title: "Closed", value: data.closedBugs },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        >
          <StatCard title={card.title} value={card.value}  icon={<BugReportOutlined />}  />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;