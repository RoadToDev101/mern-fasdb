import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/errorPage";
import { Logo } from "../components/index";

const ErrorPage = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <Logo />
        <h1>Oops! Something went wrong.</h1>
        <p>We're sorry, but there was an error processing your request.</p>
        <p>The page you are connecting is not available or being develop.</p>
        <p>
          Please try again later, or return to the{" "}
          <span>
            <Link to="/">home page</Link>
          </span>
          .
        </p>
      </div>
    </Wrapper>
  );
};

export default ErrorPage;
