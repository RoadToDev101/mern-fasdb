import React from "react";
import { useState, useReducer, useContext } from "react";
import axios from "axios";

import reducer from "./reducer";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from "./action";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({
      type: DISPLAY_ALERT,
    });
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const registerUser = async (currentUser) => {
    dispatch({
      type: REGISTER_USER_BEGIN,
    });
    try {
      const response = await axios.post("/api/auth/register", currentUser);
      console.log(response);
      const { token, user } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { token, user },
      });
      addUserToLocalStorage({ token, user });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({
      type: LOGIN_USER_BEGIN,
    });
    try {
      const response = await axios.post("/api/auth/login", currentUser);
      console.log(response);
      const { token, user } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { token, user },
      });
      addUserToLocalStorage({ token, user });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{ ...state, displayAlert, clearAlert, registerUser, loginUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, initialState, AppProvider };
