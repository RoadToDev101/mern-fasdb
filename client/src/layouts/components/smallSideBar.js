import Wrapper from "../../assets/wrappers/smallSideBar";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
import { Logo } from "../../components/index";
import NavLinks from "./navLinks";

const SmallSideBar = () => {
  const { showSideBar, toggleSideBar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={
          showSideBar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSideBar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSideBar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;
