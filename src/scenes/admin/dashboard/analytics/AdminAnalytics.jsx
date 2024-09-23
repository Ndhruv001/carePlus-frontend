import Container from "@/components/Container";
import TotalAnalytics from "./TotalAnalytics";
import PieChartAnalytics from "./PieChartAnalytics";
import BarchartAnalytics from "./BarChartAnalytics";
import PopularTableAnalytics from "./PopularTableAnalytics";

function AdminAnalytics() {
  return (
    <Container>
      <div className="flex flex-col gap-24">
        <TotalAnalytics />
        <PieChartAnalytics />
        <BarchartAnalytics />
        <PopularTableAnalytics />
      </div>
    </Container>
  );
}

export default AdminAnalytics;
