import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const rows = [
  {
    id: "BUG-101",
    title: "Login Issue",
    status: "NEW",
    priority: "HIGH",
  },
  {
    id: "BUG-102",
    title: "Dashboard Crash",
    status: "ASSIGNED",
    priority: "MEDIUM",
  },
];

const RecentBugTable = () => {
  return (
    <Paper sx={{ mt: 4 }}>
      <Typography sx={{ p: 2 }} variant="h6">
        Recent Bugs
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.priority}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default RecentBugTable;