import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/appContext";

const initialState = {
  username: "",
  email: "",
  password: "",
  isMember: true,
  showAlert: false,
};

const useRegister = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, setupUser } = useAppContext();

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
      if (username.includes("@")) {
        currentUser.email = username;
      } else {
        currentUser.username = username;
      }
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      currentUser.username = username;
      currentUser.email = email;
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "Register Successful! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 750);
    }
  }, [user, navigate]);

  return {
    values,
    handleChange,
    handleSubmit,
    toggleMember,
    showAlert,
    isLoading,
  };
};

export default useRegister;
