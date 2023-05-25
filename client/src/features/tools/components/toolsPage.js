import { NavLink } from "react-router-dom";

const ToolsPage = () => {
  return (
    <div>
      <h1>Tools Page</h1>
      <NavLink to="/compare-screws">Compare Screws</NavLink>
      <br />
      <NavLink to="/single-anchor-cal-and-compare">
        Single Anchor Calculate and Compare
      </NavLink>
    </div>
  );
};

export default ToolsPage;
