import Links from "../../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ toggleSideBar }) => {
  return (
    <div className="nav-links">
      {Links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSideBar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
