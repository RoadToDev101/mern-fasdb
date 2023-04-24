import React from "react";
import {
  useState,
  useReducer,
  useContext,
  useCallback,
  useEffect,
} from "react";
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
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from "./action";

const initialState = {
  user: null,
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  showBigSideBar: true,
  showSmallSideBar: false,
  selectedProductId: "",
  isActive: false,
  productLine: "",
  modelName: "",
  company: "",
  application: [],
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
      dispatch({ type: CLEAR_ALERT });
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
    dispatch({ type: TOGGLE_BIG_SIDEBAR });
    dispatch({ type: TOGGLE_SMALL_SIDEBAR });
  };

  const toggleBigSideBar = () => {
    dispatch({ type: TOGGLE_BIG_SIDEBAR });
  };

  const toggleSmallSideBar = () => {
    dispatch({ type: TOGGLE_SMALL_SIDEBAR });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(`api/auth/${endPoint}`, currentUser);
      const { user } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, alertText },
      });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = async () => {
    await authFetch.get("/auth/logout");
    dispatch({ type: LOGOUT_USER });
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch.get("/auth/get-current-user");
      const { user } = data;
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };
  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch(`/user/update-user`, currentUser);
      const { user } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user },
      });
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
    dispatch({ type: CREATE_PRODUCT_BEGIN });
    try {
      const { productLine, modelName, company } = state;
      await authFetch.post(`/product/create-product`, {
        productLine,
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
    dispatch({ type: EDIT_PRODUCT_BEGIN });
    try {
      const { productLine, modelName, company, isActive } = state;
      await authFetch.patch(
        `/product/update-product/${state.selectedProductId}`,
        {
          isActive,
          productLine,
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
    dispatch({ type: DELETE_PRODUCT_BEGIN });
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
        getCurrentUser,
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
