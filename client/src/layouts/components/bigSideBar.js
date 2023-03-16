import Wrapper from "../../assets/wrappers/bigSideBar";
import { useAppContext } from "../../context/appContext";
import { Logo } from "../../components/index";
import FeatureNavLinks from "./navLinks";

const BigSideBar = () => {
  const { showBigSideBar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showBigSideBar
            ? "sidebar-container show-sidebar"
            : "sidebar-container "
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <FeatureNavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;
