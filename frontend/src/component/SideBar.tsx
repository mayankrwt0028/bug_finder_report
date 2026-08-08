import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";


import BugReportIcon from "@mui/icons-material/BugReport";
import FolderIcon from "@mui/icons-material/Folder";
import GroupIcon from "@mui/icons-material/Group";
import AssessmentIcon from "@mui/icons-material/Assessment";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuStyle = {
    color: "white",
    borderRadius: 2,
    mb: 1,
    "&.active": {
      bgcolor: "rgba(255,255,255,0.18)",
    },
    "&:hover": {
      bgcolor: "rgba(255,255,255,0.1)",
    },
  };

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "#1976d2",
        color: "#fff",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>
        Bug Tracker
      </Typography>

      <List>
        <ListItemButton
          component={NavLink}
          to={`/${user?.role.toLowerCase()}/projects`}
          sx={menuStyle}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to={`/${user?.role.toLowerCase()}/bugs`}
          sx={menuStyle}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <BugReportIcon />
          </ListItemIcon>
          <ListItemText primary="Bugs" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to={`/${user?.role.toLowerCase()}/reports`}
          sx={menuStyle}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>

        {(user?.role === "ADMIN" || user?.role === "MANAGER") && (
          <ListItemButton
            component={NavLink}
            to={`/${user?.role.toLowerCase()}/users`}
            sx={menuStyle}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        )}
      </List>

      <Button
        variant="contained"
        color="error"
        fullWidth
        sx={{ mt: 4 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;