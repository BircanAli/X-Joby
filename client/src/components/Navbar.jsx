import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";
import SmallSidebar from "./SmallSidebar";

const Navbar = () => {
  const { toggleSidebar, showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button onClick={toggleSidebar} type="button" className="toggle-btn">
          {!showSidebar ? <FaAlignLeft /> : <SmallSidebar />}
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">toggle/logout</div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
