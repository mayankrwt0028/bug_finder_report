import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { uploadAttachment } from "../../services/attachment.service";
import { getComment, createComment } from "../../services/comment.service";

import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  TextField,
  MenuItem,
  Button,
  Select,
} from "@mui/material";

import {
  getBugById,
  updateStatus,
  assignBug,
} from "../../services/bug.service";

import { getUsers } from "../../services/user.service";
// import { useAuth } from "../../context/AuthContext";

const BugDetails = () => {
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [bug, setBug] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("");

  const [developers, setDevelopers] = useState<any[]>([]);

  const [developerId, setDeveloperId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [showcomment, setShowComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bugRes = await getBugById(id!);

        setBug(bugRes.data.bug);

        setStatus(bugRes.data.bug.status);

        if (user.role === "ADMIN" || user.role === "MANAGER") {
          const userRes = await getUsers();

          const devs = userRes.data.user.filter(
            (u: any) => u.role === "DEVELOPER",
          );

          setDevelopers(devs);
        }

        if (bugRes.data.bug.assignedToId) {
          setDeveloperId(bugRes.data.bug.assignedToId);
        }
      } catch (err) {
        toast.error("Failed to load bug");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user.role]);

  const handleStatusUpdate = async () => {
    try {
      await updateStatus(bug.id, status);

      setBug({
        ...bug,
        status,
      });

      toast.success("Status Updated");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const handleAssign = async () => {
    try {
      await assignBug(bug.id, developerId);

      const selectedDeveloper = developers.find(
        (dev) => dev.id === developerId,
      );

      setBug({
        ...bug,
        assignedToId: developerId,
        assignedTo: selectedDeveloper,
      });

      toast.success("Bug Assigned");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  const handleSolutionUpload = async () => {
    if (!file) {
      toast.error("Select a screenshot");
      return;
    }

    try {
      await uploadAttachment(bug.id, file, "SOLUTION");

      const bugRes = await getBugById(bug.id);

      setBug(bugRes.data.bug);

      toast.success("Solution uploaded");

      setFile(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Upload failed");
    }
  };

  if (loading || !bug) {
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
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4">{bug.title}</Typography>

      <Typography sx={{ mt: 2 }}>
        <b>Description:</b> {bug.description}
      </Typography>

      <Typography sx={{ mt: 2 }}>
        <b>Status:</b> {bug.status}
      </Typography>

      <Typography sx={{ mt: 2 }}>
        <b>Priority:</b> {bug.priority}
      </Typography>

      <Typography sx={{ mt: 2 }}>
        <b>Severity:</b> {bug.severity}
      </Typography>

      <Typography sx={{ mt: 2 }}>
        <b>Project:</b> {bug.project?.name}
      </Typography>

      <Typography sx={{ mt: 2 }}>
        <b>Created By:</b> {bug.createdBy?.name}
      </Typography>

      <Typography sx={{ mt: 2 }}>
        <b>Assigned To:</b> {bug.assignedTo?.name || "Not Assigned"}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Bug Screenshot
        </Typography>
        {user.role === "DEVELOPER" && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Solution Screenshot
            </Typography>

            {bug.attachments
              ?.filter((a: any) => a.type === "SOLUTION")
              .map((img: any) => (
                <Box key={img.id} sx={{ mb: 2 }}>
                  <img
                    src={img.fileUrl}
                    alt={img.fileName}
                    style={{
                      width: "100%",
                      maxWidth: "700px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                </Box>
              ))}

            <Button variant="outlined" component="label" sx={{ mt: 2 }}>
              Choose Solution Screenshot
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

            {file && <Typography sx={{ mt: 1 }}>{file.name}</Typography>}

            <Button
              variant="contained"
              sx={{ mt: 2, ml: 2 }}
              onClick={handleSolutionUpload}
            >
              Upload Solution
            </Button>
          </Box>
        )}

        {bug.attachments?.filter((a: any) => a.type === "BUG").length > 0 ? (
          bug.attachments
            .filter((a: any) => a.type === "BUG")
            .map((img: any) => (
              <Box key={img.id} sx={{ mb: 2 }}>
                <img
                  src={img.fileUrl}
                  alt={img.fileName}
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    maxHeight: "300px",
                    marginTop: "10px",
                    objectFit: "contain",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    display: "block",
                  }}
                />
              </Box>
            ))
        ) : (
          <Typography>No Screenshot Uploaded</Typography>
        )}
      </Box>

      {/* Update Status */}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Update Status</Typography>

        <Select
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="NEW">NEW</MenuItem>

          <MenuItem value="ASSIGNED">ASSIGNED</MenuItem>

          <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>

          <MenuItem value="RESOLVED">RESOLVED</MenuItem>

          <MenuItem value="VERIFIED">VERIFIED</MenuItem>

          <MenuItem value="REOPENED">REOPENED</MenuItem>

          <MenuItem value="CLOSED">CLOSED</MenuItem>
        </Select>

        <Button variant="contained" sx={{ mt: 2 }} onClick={handleStatusUpdate}>
          Update Status
        </Button>
      </Box>

      {(user.role === "ADMIN" || user.role === "MANAGER") && (
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6">Assign Developer</Typography>

          <TextField
            select
            fullWidth
            label="Developer"
            value={developerId}
            onChange={(e) => setDeveloperId(e.target.value)}
          >
            {developers.map((dev: any) => (
              <MenuItem key={dev.id} value={dev.id}>
                {dev.name}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained" sx={{ mt: 2 }} onClick={handleAssign}>
            Assign Bug
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default BugDetails;
