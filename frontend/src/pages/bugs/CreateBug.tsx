import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";

import { createBug } from "../../services/bug.service";
import { getProjects } from "../../services/project.service";
import { uploadAttachment } from "../../services/attachment.service";

const CreateBug = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<any[]>([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    severity: "MEDIUM",
    reproducibility: "ALWAYS",
    projectId: "",
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();

        setProjects(res.data.projects);
      } catch (err) {
        toast.error("Failed to load projects");
      }
    };

    fetchProjects();
  }, []);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleSubmit = async () => {
    try {
      const res = await createBug(form);

      const bug = res.data.bug;

      if (file) {
        await uploadAttachment(bug.id, file, "BUG");
      }

      toast.success("Bug created");

      if (user.role === "ADMIN") {
        navigate("/admin/bugs");
      } else if (user.role === "MANAGER") {
        navigate("/manager/bugs");
      } else if (user.role === "QA") {
        navigate("/qa/bugs");
      } else if (user.role === "DEVELOPER") {
        navigate("/developer/bugs");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create bug");
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Create Bug
      </Typography>

      <TextField
        fullWidth
        label="Bug Title"
        value={form.title}
        sx={{ mb: 2 }}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
      />

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Description"
        value={form.description}
        sx={{ mb: 2 }}
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
        sx={{ mb: 2 }}
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
        sx={{ mb: 2 }}
        onChange={(e) =>
          setForm({
            ...form,
            severity: e.target.value,
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
        label="Reproducibility"
        value={form.reproducibility}
        sx={{ mb: 2 }}
        onChange={(e) =>
          setForm({
            ...form,
            reproducibility: e.target.value,
          })
        }
      >
        <MenuItem value="ALWAYS">ALWAYS</MenuItem>

        <MenuItem value="SOMETIMES">SOMETIMES</MenuItem>

        <MenuItem value="RARELY">RARELY</MenuItem>

        <MenuItem value="UNABLE_TO_REPRODUCE">UNABLE_TO_REPRODUCE</MenuItem>
      </TextField>

      <TextField
        select
        fullWidth
        label="Project"
        value={form.projectId}
        sx={{ mb: 3 }}
        onChange={(e) =>
          setForm({
            ...form,
            projectId: e.target.value,
          })
        }
      >
        {projects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Screenshot (Optional)
        </Typography>

        <Button variant="outlined" component="label" fullWidth>
          Choose Screenshot
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.length) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </Button>

        {file && (
          <>
            <Typography color="success.main" sx={{ mt: 1 }}>
              Selected: {file.name}
            </Typography>

            <Box
              component="img"
              src={URL.createObjectURL(file)}
              alt="Preview"
              sx={{
                mt: 2,
                width: "100%",
                maxHeight: 250,
                objectFit: "contain",
                borderRadius: 2,
                border: "1px solid #ddd",
              }}
            />
          </>
        )}
      </Box>

      <Button variant="contained" onClick={handleSubmit}>
        Create Bug
      </Button>
    </Paper>
  );
};

export default CreateBug;
