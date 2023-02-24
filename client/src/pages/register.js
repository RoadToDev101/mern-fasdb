import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components/componentsIndex";
import Wrapper from "../assets/wrappers/registerPage";
import { useAppContext } from "../context/appContext";

const initialState = {
  username: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  // global state and useNavigate
  const { isLoading, showAlert, displayAlert } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert("Please provide all values!", "danger");
      return;
    }
    console.log("Submitted");
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <nav>
          <Logo />
        </nav>
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            label="Username"
            placeholder="Enter your username"
            autoComplete={"username"}
          />
        )}

        <FormRow
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          label="Email"
          placeholder="Enter your email"
          autoComplete={"email"}
        />
        <FormRow
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          label="Password"
          placeholder="Enter your password"
          autoComplete={"current-password"}
        />
        <button type="submit" className="btn btn-block">
          Login
        </button>
        <p>
          {values.isMember ? "Not a member?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register now!" : "Login to your account!"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
