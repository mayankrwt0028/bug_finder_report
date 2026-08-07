import { Box, Paper, Typography } from "@mui/material";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AuthLayout = ({
  title,
  subtitle,
  children,
}: AuthLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "#f4f7fb",
      }}
    >

      <Box
        sx={{
          width: "50%",
          background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
          color: "#fff",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 6,
        }}
      >
       <Typography
  variant="h3"
  gutterBottom
  sx={{ fontWeight: "bold" }}
>
          Jira Premium
        </Typography>

        <Typography
          variant="h6"
          sx={{
            maxWidth: 420,
            textAlign: "center",
            opacity: 0.9,
            mb: 5,
          }}
        >
          Track bugs, assign developers, monitor progress and manage projects
          efficiently.
        </Typography>

        <Box sx={{ fontSize: 18, lineHeight: 2 }}>
          <Typography>✔ Report Bugs</Typography>
          <Typography>✔ Assign Developers</Typography>
          <Typography>✔ Track Status</Typography>
          <Typography>✔ Reports & Analytics</Typography>
        </Box>
      </Box>

     
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 450,
            p: 5,
            borderRadius: 3,
          }}
        >
          <Typography
  variant="h3"
  gutterBottom
  sx={{ fontWeight: "bold" }}
>
            {title}
          </Typography>

          <Typography
  variant="h3"
  gutterBottom
  sx={{ fontWeight: "bold" }}
>
            {subtitle}
          </Typography>

          {children}
        </Paper>
      </Box>
    </Box>
  );
};

export default AuthLayout;