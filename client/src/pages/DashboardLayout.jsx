import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";

const DashboardLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <Navbar />
        <div className="dashboard-page"></div>
        <Outlet />
      </main>
    </Wrapper>
  );
};
export default DashboardLayout;
