import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBugs } from "../../services/bug.service";

import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";

function BugList() {
  const navigate = useNavigate();

  const [bugs, setBugs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchBugs = async () => {
    try {
      const res = await getAllBugs();

      setBugs(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h5">Bug List</Typography>

        {(user.role === "ADMIN" ||
          user.role === "MANAGER" ||
          user.role === "QA") && (
          <Button
            variant="contained"
            onClick={() => navigate("/qa/bugs/create")}
          >
            Create Bug
          </Button>
        )}
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>

            <TableCell>Project</TableCell>

            <TableCell>Priority</TableCell>

            <TableCell>Status</TableCell>

            <TableCell>Assigned To</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {bugs.map((bug) => (
            <TableRow
              key={bug.id}
              hover
              sx={{
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`/${user.role.toLowerCase()}/bugs/${bug.id}`)
              }
            >
              <TableCell>{bug.title}</TableCell>

              <TableCell>{bug.project?.name}</TableCell>

              <TableCell>{bug.priority}</TableCell>

              <TableCell>{bug.status}</TableCell>

              <TableCell>{bug.assignedTo?.name || "Not Assigned"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default BugList;
