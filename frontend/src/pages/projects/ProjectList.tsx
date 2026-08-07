import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getProjects, deleteProject } from "../../services/project.service";

import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const ProjectList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [projects, setProjects] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data.projects);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this project?");

    if (!ok) return;

    try {
      await deleteProject(id);

      toast.success("Project Deleted");

      fetchProjects();
    } catch (err: any) {
      toast.error(err.response?.data?.message);
    }
  };

  const filtered = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Projects</Typography>

        {(user?.role === "ADMIN" || user?.role === "MANAGER") && (
          <Button
            variant="contained"
            onClick={() =>
              navigate(`/${user.role.toLowerCase()}/projects/create`)
            }
          >
            Create Project
          </Button>
        )}
      </Box>

      <TextField
        fullWidth
        placeholder="Search Project..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>

            <TableCell>Description</TableCell>

            <TableCell>Created</TableCell>

            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filtered.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>

              <TableCell>{project.description}</TableCell>

              <TableCell>
                {new Date(project.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => navigate(`edit/${project.id}`)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ProjectList;
