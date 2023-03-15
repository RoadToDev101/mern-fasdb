import Wrapper from "../../assets/wrappers/bigSideBar";
import { useAppContext } from "../../context/appContext";
import { Logo } from "../../components/index";
import NavLinks from "./navLinks";

const BigSideBar = () => {
  const { showSideBar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSideBar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;
