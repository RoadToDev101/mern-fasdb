import React from "react";
import { useState, useReducer, useContext, useCallback } from "react";
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
  LOGOUT_USER,
  TOGGLE_BIG_SIDEBAR,
  TOGGLE_SMALL_SIDEBAR,
  CHANGE_PAGE,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CLEAR_FILTERS,
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  SET_EDIT_PRODUCT,
  EDIT_PRODUCT_BEGIN,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  DELETE_PRODUCT_BEGIN,
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
  selectedProductId: "",
  isActive: false,
  productType: "",
  modelName: "",
  company: "",
  products: [],
  totalProducts: 0,
  page: 1,
  numOfPages: 1,
  modelNameSearch: "",
  productTypeSearch: "all",
  companySearch: "all",
  sortBy: "a-z",
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
    dispatch({ type: DISPLAY_ALERT });
  };

  const [timeoutId, setTimeoutId] = useState(null);

  const clearAlert = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
    setTimeoutId(id);
  }, [dispatch, timeoutId]);

  const handleChange = (e) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
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

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
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
      // console.log(error.response);
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
      const { data } = await authFetch.patch(`/user/update-user`, currentUser);
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

  const createProduct = async (product) => {
    dispatch({
      type: CREATE_PRODUCT_BEGIN,
    });
    try {
      const { productType, modelName, company } = state;
      await authFetch.post(`/product/create-product`, {
        productType,
        modelName,
        company,
      });
      dispatch({ type: CREATE_PRODUCT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      console.log(error.response);
      // If the user is not authorized, logout the user
      if (error.response.status !== 401) {
        dispatch({
          type: CREATE_PRODUCT_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const getProducts = async () => {
    const { page, modelNameSearch, productTypeSearch, companySearch, sortBy } =
      state;
    const searchString = `?page=${page}&?productTypeSearch=${productTypeSearch}&companySearch=${companySearch}&sortBy=${sortBy}`;
    let url = `/product/get-all-products${searchString}`;
    if (modelNameSearch) {
      url = url + `&modelNameSearch=${modelNameSearch}`;
    }
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { products, totalProducts, numOfPages } = data;
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: {
          products,
          totalProducts,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const viewProduct = (id) => {
    console.log(`view product id: ${id}`);
  };

  const setEditProduct = (id) => {
    dispatch({
      type: SET_EDIT_PRODUCT,
      payload: { id },
    });
  };

  const editProduct = async () => {
    dispatch({
      type: EDIT_PRODUCT_BEGIN,
    });
    try {
      const { productType, modelName, company, isActive } = state;
      await authFetch.patch(
        `/product/update-product/${state.selectedProductId}`,
        {
          isActive,
          productType,
          modelName,
          company,
        }
      );
      dispatch({ type: EDIT_PRODUCT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: EDIT_PRODUCT_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
  };

  const deleteProduct = async (productId) => {
    dispatch({
      type: DELETE_PRODUCT_BEGIN,
    });
    try {
      await authFetch.delete(`/product/delete-product/${productId}`);
      getProducts();
    } catch (error) {
      // console.log(error.response);
      logoutUser();
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearValues,
        clearFilters,
        toggleBothSideBar,
        toggleBigSideBar,
        toggleSmallSideBar,
        handleChange,
        changePage,
        setupUser,
        logoutUser,
        updateUser,
        createProduct,
        getProducts,
        viewProduct,
        setEditProduct,
        editProduct,
        deleteProduct,
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
