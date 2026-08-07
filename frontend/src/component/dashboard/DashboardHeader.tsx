import { Typography } from "@mui/material";

interface Props {
  title: string;
  subtitle: string;
}

const DashboardHeader = ({ title, subtitle }: Props) => {
  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 700 }}
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        {subtitle}
      </Typography>
    </>
  );
};

export default DashboardHeader;