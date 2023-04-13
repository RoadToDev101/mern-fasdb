import FeatureLinks from "@utils/featureLinks";
import { NavLink } from "react-router-dom";
import { useAppContext } from "@context/appContext";

const FeatureNavLinks = () => {
  const { showBigSmallBar, toggleSmallSideBar } = useAppContext();
  return (
    <div className="nav-links">
      {FeatureLinks.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={!showBigSmallBar ? toggleSmallSideBar : null}
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

export default FeatureNavLinks;
