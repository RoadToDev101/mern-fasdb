import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "@components/index";
import Wrapper from "../../../assets/wrappers/registerPage";
import { useAppContext } from "../../../context/appContext";

const initialState = {
  username: "",
  email: "",
  password: "",
  isMember: true,
  showAlert: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  // global state and useNavigate
  const { isLoading, showAlert, displayAlert, clearAlert } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, isMember } = values;
    // Alert if email or password empty
    if (!email || !password || (!isMember && !username)) {
      displayAlert("Please provide all values!", "danger");
      // Clear alert after 3s
      clearAlert();
      return;
    }

    console.log(values);
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
          {values.isMember ? "Submit" : "Login"}
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
