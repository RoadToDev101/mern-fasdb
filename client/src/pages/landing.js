import Wrapper from "../assets/wrappers/landingPage";
import { Logo } from "../components/componentsIndex";
import { Link } from "react-router-dom";
const landing = () => {
  return (
    <Wrapper>
      <div className="container page">
        <nav>
          <Logo />
          <h1>Fastener Database App</h1>
        </nav>
        <div className="info">
          <p>
            The Simpson Strong-Tie fastener database app is a comprehensive and
            user-friendly tool designed to provide access to a centralized data
            center for a wide range of fastener products. With this app, users
            can quickly and easily search and filter through a vast selection of
            screws, nails, staples, and anchors to find the right product for
            their needs.
          </p>
          <p>
            Whether you're a DIY enthusiast or a professional contractor, this
            app provides all the detailed information you need to make informed
            decisions about which product to choose. With the ability to view
            detailed product information, including specifications, installation
            instructions, and testing data, the Simpson Strong-Tie fastener
            database app makes it easy to find the right product for any
            project. Whether you're looking for a specific size, material, or
            application, this app puts all the information you need right at
            your fingertips.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default landing;
