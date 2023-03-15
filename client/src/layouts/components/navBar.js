import React from "react";
import Wrapper from "../../assets/wrappers/navBar";
import {
  FaAlignLeft,
  FaUserCircle,
  FaCaretDown,
  FaSignOutAlt,
  FaEye,
} from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
import { Logo } from "../../components/index";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSideBar, logoutUser, user } = useAppContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSideBar}>
          <FaAlignLeft />
        </button>
        <div>
          <div className="logo-container logo">
            <Logo />
          </div>
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.username}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              <FaSignOutAlt /> logout
            </button>
            <Link to="/user-profile">
              <button type="button" className="dropdown-btn">
                <FaEye /> profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NavBar;
