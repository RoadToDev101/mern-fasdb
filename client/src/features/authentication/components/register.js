import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, FormRow, Alert } from "../../../components/index";
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
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  // global state and useNavigate
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    clearAlert,
    registerUser,
    loginUser,
  } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, isMember } = values;

    const currentUser = { password };
    if (isMember) {
      // Check if the user is trying to login with their username or email
      if (username.includes("@")) {
        // The user is trying to login with their email
        currentUser.email = username;
      } else {
        // The user is trying to login with their username
        currentUser.username = username;
      }
      loginUser(currentUser);
    } else {
      currentUser.username = username;
      currentUser.email = email;
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);

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
          type={!values.isMember ? "email" : "text"}
          id="login-input"
          name={!values.isMember ? "email" : "username"}
          value={!values.isMember ? values.email : values.username}
          onChange={handleChange}
          label={!values.isMember ? "Email" : "Email/Username"}
          placeholder={`Enter your ${
            !values.isMember ? "email" : "email or username"
          }`}
          autoComplete={!values.isMember ? "email" : "email username"}
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

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {values.isMember ? "Login" : "Submit"}
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
