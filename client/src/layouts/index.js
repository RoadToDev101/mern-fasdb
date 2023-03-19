import NavBar from "./components/navBar";
import BigSideBar from "./components/bigSideBar";
import SmallSideBar from "./components/smallSideBar";
import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/sharedLayout";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSideBar />
        <BigSideBar />
        <div>
          <NavBar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
