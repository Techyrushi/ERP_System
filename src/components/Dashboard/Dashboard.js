import DashboardStartsGrid from "./DashboardStartsGrid";
import RecentOrders from "../dashboardOrders/RecentOrders";
import PopularProducts from "../dashboardOrders/PopularProducts";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <DashboardStartsGrid />
      <div className="flex flex-row gap-4 w-full">
        <RecentOrders/>
        <PopularProducts/>
      </div>
    </div>
  );
};

export default Dashboard;
