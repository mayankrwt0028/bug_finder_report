import { useEffect, useState } from "react";
import { getReports } from "../../services/report.service";

import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
} from "@mui/material";

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    loadReports();
  }, []);

 const loadReports = async () => {
  try {
    const res = await getReports();

    console.log("API RESPONSE:", res.data);
    console.log("REPORT:", res.data.data);

    setReport(res.data.data);
  } catch (err) {
    console.log("REPORT ERROR:", err);
  } finally {
    setLoading(false);
  }
};

  if (loading || !report) {
  return <CircularProgress />;
}

  return (
   <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Reports
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Status Types</Typography>
              <Typography variant="h4">
                {report.statusReport.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Priority Types</Typography>
              <Typography variant="h4">
                {report.priorityReport.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Severity Types</Typography>
              <Typography variant="h4">
                {report.severityReport.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Developers</Typography>
              <Typography variant="h4">
                {report.developerReport.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Status Report */}
      <Paper sx={{ mt: 4, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Status Report
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell align="right">Count</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {report.statusReport.map((item: any) => (
              <TableRow key={item.status}>
                <TableCell>{item.status}</TableCell>
                <TableCell align="right">
                  {item._count.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Priority Report */}
      <Paper sx={{ mt: 4, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Priority Report
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Priority</TableCell>
              <TableCell align="right">Count</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {report.priorityReport.map((item: any) => (
              <TableRow key={item.priority}>
                <TableCell>{item.priority}</TableCell>
                <TableCell align="right">
                  {item._count.priority}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Severity Report */}
      <Paper sx={{ mt: 4, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Severity Report
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Severity</TableCell>
              <TableCell align="right">Count</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {report.severityReport.map((item: any) => (
              <TableRow key={item.severity}>
                <TableCell>{item.severity}</TableCell>
                <TableCell align="right">
                  {item._count.severity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Developer Report */}
      <Paper sx={{ mt: 4, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Developer Workload
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Assigned Bugs</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {report.developerReport.map((dev: any) => (
              <TableRow key={dev.id}>
                <TableCell>{dev.name}</TableCell>
                <TableCell>{dev.email}</TableCell>
                <TableCell align="right">
                  {dev._count.assignedBugs}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Reports;