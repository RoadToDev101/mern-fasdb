import Wrapper from "@wrappers/smallSideBar";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "@context/appContext";
import { Logo } from "@components/index";
import FeatureNavLinks from "./navLinks";

const SmallSideBar = () => {
  const { showSmallSideBar, toggleSmallSideBar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={
          showSmallSideBar
            ? "sidebar-container show-sidebar"
            : "sidebar-container close-sidebar"
        }
      >
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={toggleSmallSideBar}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <FeatureNavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;
