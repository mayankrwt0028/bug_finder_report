import { useEffect, useState } from "react";
import { getProjects } from "../../services/project.service";
import { Button, MenuItem, Paper, TextField } from "@mui/material";
import { createBug } from "../../services/bug.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ReportingBug() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
    severity: "",
    reproducibility: "",
    projectId: "",
    assignedToId: "",
  });
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        setProjects(res.data.projects);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProjects();
  }, []);
  const handleSubmit = async () => {
    try {
      await createBug(form);

      toast.success("Bug Created");

      navigate("/qa/bugs");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <Paper
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 4,
        p: 4,
      }}
    >
      <TextField
        select
        fullWidth
        label="Project"
        value={form.projectId}
        onChange={(e) =>
          setForm({
            ...form,
            projectId: e.target.value,
          })
        }
      >
        {projects.map((project: any) => (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Bug Title"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
      />
      <TextField
        multiline
        rows={4}
        fullWidth
        label="Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <TextField
        select
        fullWidth
        label="Priority"
        value={form.priority}
        onChange={(e) =>
          setForm({
            ...form,
            priority: e.target.value,
          })
        }
      >
        <MenuItem value="LOW">LOW</MenuItem>
        <MenuItem value="MEDIUM">MEDIUM</MenuItem>
        <MenuItem value="HIGH">HIGH</MenuItem>
        <MenuItem value="CRITICAL">CRITICAL</MenuItem>
      </TextField>

      <TextField
        select
        fullWidth
        label="Severity"
        value={form.severity}
        onChange={(e) =>
          setForm({
            ...form,
            severity: e.target.value,
          })
        }
        sx={{ mt: 2 }}
      >
        <MenuItem value="LOW">LOW</MenuItem>
        <MenuItem value="MEDIUM">MEDIUM</MenuItem>
        <MenuItem value="HIGH">HIGH</MenuItem>
        <MenuItem value="CRITICAL">CRITICAL</MenuItem>
      </TextField>

      <TextField
        select
        fullWidth
        label="Reproducibility"
        value={form.reproducibility}
        onChange={(e) =>
          setForm({
            ...form,
            reproducibility: e.target.value,
          })
        }
        sx={{ mb: 2 }}
      >
        <MenuItem value="ALWAYS">Always</MenuItem>
        <MenuItem value="SOMETIMES">Sometimes</MenuItem>
        <MenuItem value="RARE">Rare</MenuItem>
      </TextField>

      <Button variant="contained" onClick={handleSubmit}>
        Submit Bug
      </Button>
    </Paper>
  );
}

export default ReportingBug;
