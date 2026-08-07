import { useState } from "react";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createProject } from "../../services/project.service";

const CreateProject = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async () => {
    try {
      await createProject(form);

      toast.success("Project Created");

      navigate(-1);
    } catch (err: any) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Create Project
      </Typography>

      <TextField
        fullWidth
        label="Project Name"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
        sx={{ mb: 2 }}
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
        sx={{ mb: 3 }}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Create Project
      </Button>
    </Paper>
  );
};

export default CreateProject;
