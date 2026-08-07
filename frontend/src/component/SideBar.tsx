import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout, user } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: 230,
        bgcolor: "#1976d2",
        color: "#fff",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 4, fontWeight: 700 }}
      >
         Bug Tracker
      </Typography>

<List>
  <ListItemButton
    component={NavLink}
    to={`/${user?.role.toLowerCase()}/dashboard`}
  >
    <ListItemText primary="Dashboard" />
  </ListItemButton>

  <ListItemButton
    component={NavLink}
    to={`/${user?.role.toLowerCase()}/projects`}
  >
    <ListItemText primary="Projects" />
  </ListItemButton>

  <ListItemButton
    component={NavLink}
    to={`/${user?.role.toLowerCase()}/bugs`}
  >
    <ListItemText primary="Bugs" />
  </ListItemButton>

  {(user?.role === "ADMIN" || user?.role === "MANAGER") && (
    <ListItemButton
      component={NavLink}
      to={`/${user.role.toLowerCase()}/users`}
    >
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