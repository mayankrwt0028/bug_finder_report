import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "../component/SideBar";
import Navbar from "../component/NavBar";

const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <Box sx={{ flex: 1 }}>
        <Navbar />

        <Box
          sx={{
            p: 3,
            mt: "64px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;