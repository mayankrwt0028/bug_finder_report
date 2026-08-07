import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: Props) => {
  return (
    <Card elevation={3}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: 700 }}
            >
              {value}
            </Typography>
          </Box>

          {icon}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;