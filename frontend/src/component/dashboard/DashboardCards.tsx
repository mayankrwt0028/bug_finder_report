import Grid from "@mui/material/Grid";
import StatCard from "./StatCard";

interface CardItem {
  title: string;
  value: number;
  icon: React.ReactNode;
}

interface Props {
  cards: CardItem[];
}

const DashboardCards = ({ cards }: Props) => {
  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        >
          <StatCard
            title={card.title}
            value={card.value}
            icon={card.icon}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;