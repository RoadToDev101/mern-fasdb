import React, { useState, useEffect } from "react";
import Wrapper from "../../assets/wrappers/navBar";
import {
  FaUserCircle,
  FaCaretDown,
  FaSignOutAlt,
  FaEye,
  FaAlignJustify,
} from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
import { Logo } from "../../components/index";
import { Link, useLocation } from "react-router-dom";
import FeatureLinks from "../../utils/featureLinks";
import OtherLinks from "../../utils/otherLinks";

const NavBar = () => {
  const [navBarTitle, setNavBarTitle] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { toggleBothSideBar, logoutUser, user } = useAppContext();
  const location = useLocation();

  // Find the link that matches the current route's path
  const currentLink =
    FeatureLinks.find((link) => link.path === location.pathname) ||
    OtherLinks.find((link) => link.path === location.pathname);

  useEffect(() => {
    if (currentLink) {
      setNavBarTitle(currentLink.title);
    } else {
      setNavBarTitle("");
    }
  }, [currentLink]);

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={toggleBothSideBar}
        >
          <FaAlignJustify />
        </button>
        <div>
          <div className="logo-container logo">
            <Logo />
          </div>
          <h3 className="logo-text">{navBarTitle}</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <FaUserCircle />
            {user?.username}
            <FaCaretDown />
          </button>
          <div
            className={showUserDropdown ? "dropdown show-dropdown" : "dropdown"}
          >
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
