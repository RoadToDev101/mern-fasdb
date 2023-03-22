import React from "react";
import { useReducer, useContext } from "react";
import axios from "axios";

import reducer from "./reducer";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  TOGGLE_BIG_SIDEBAR,
  TOGGLE_SMALL_SIDEBAR,
  LOGOUT_USER,
} from "./action";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  showBigSideBar: true,
  showSmallSideBar: false,
  editProductId: "",
  productType: "",
  modelName: "",
  company: "",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios
  const authFetch = axios.create({
    baseURL: "/api",
  });
  // request interceptor
  authFetch.interceptors.request.use(
    (config) => {
      // do something before request is sent
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      // do something with request error
      return Promise.reject(error);
    }
  );
  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      // do something with response data
      return response;
    },
    (error) => {
      // do something with response error
      // console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

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

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({
      type: SETUP_USER_BEGIN,
    });
    try {
      const { data } = await axios.post(`api/auth/${endPoint}`, currentUser);
      const { token, user } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { token, user, alertText },
      });
      addUserToLocalStorage({ token, user });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({
      type: LOGOUT_USER,
    });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({
      type: UPDATE_USER_BEGIN,
    });
    try {
      const { data } = await authFetch.patch(`/user/updateUser`, currentUser);
      const { user, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      // If the user is not authorized, logout the user
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const toggleBothSideBar = () => {
    dispatch({
      type: TOGGLE_BIG_SIDEBAR,
    });
    dispatch({
      type: TOGGLE_SMALL_SIDEBAR,
    });
  };

  const toggleBigSideBar = () => {
    dispatch({
      type: TOGGLE_BIG_SIDEBAR,
    });
  };

  const toggleSmallSideBar = () => {
    dispatch({
      type: TOGGLE_SMALL_SIDEBAR,
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        updateUser,
        toggleBothSideBar,
        toggleBigSideBar,
        toggleSmallSideBar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, initialState, AppProvider };
