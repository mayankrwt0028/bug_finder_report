import { AppBar, Toolbar, Typography, Box } from "@mui/material";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={1}
      sx={{
        width: "calc(100% - 230px)",
        ml: "230px",
      }}
    >
      <Toolbar>
        <Box>
          <Typography variant="h6">
            Welcome, {user?.name}
          </Typography>

          <Typography variant="body2">
            Role: {user?.role}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;