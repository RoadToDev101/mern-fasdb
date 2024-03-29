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
  UPLOAD_DRAWING_BEGIN,
  UPLOAD_DRAWING_SUCCESS,
  UPLOAD_DRAWING_ERROR,
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
  drawingName: "",
  version: "",
  revisedDate: "",
  file: null,
  totalProducts: 0,
  page: 1,
  numOfPages: 1,
  sortBy: "a-z",
  productNameSearch: "",
  productLineSearch: [],
  companySearch: [],
  materialSearch: [],
  corrosionResistanceSearch: [],
  coatingSearch: [],
  applicationSearch: [],
  shankTypeSearch: [],
  headTypeSearch: [],
  pointTypeSearch: [],
  threadTypeSearch: [],
  driveTypeSearch: [],
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

  const handleDateChange = (date) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name: "revisedDate", value: date },
    });
  };

  const handleFileChange = (e) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name: e.target.name, value: e.target.files[0] },
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
      const { data } = await authFetch.patch(
        `/user/update-username-email`,
        currentUser
      );
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
      const { productLine, modelName, company, application } = state;
      await authFetch.post(`/product/create-product`, {
        productLine,
        modelName,
        company,
        application,
      });
      dispatch({ type: CREATE_PRODUCT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      // console.log(error.response);
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
    const {
      page,
      sortBy,
      productNameSearch,
      productLineSearch,
      companySearch,
      materialSearch,
      corrosionResistanceSearch,
      coatingSearch,
      applicationSearch,
      shankTypeSearch,
      headTypeSearch,
      threadTypeSearch,
      driveTypeSearch,
      pointTypeSearch,
    } = state;
    const searchParams = new URLSearchParams();
    searchParams.append("page", page);
    searchParams.append("sortBy", sortBy);
    if (productNameSearch) {
      searchParams.append("productNameSearch", productNameSearch);
    }
    if (
      productLineSearch &&
      Array.isArray(productLineSearch) &&
      productLineSearch.length > 0
    ) {
      productLineSearch.forEach((item) => {
        searchParams.append("productLineSearch[]", item);
      });
    }
    if (
      companySearch &&
      Array.isArray(companySearch) &&
      companySearch.length > 0
    ) {
      companySearch.forEach((item) => {
        searchParams.append("companySearch[]", item);
      });
    }
    if (
      materialSearch &&
      Array.isArray(materialSearch) &&
      materialSearch.length > 0
    ) {
      materialSearch.forEach((item) => {
        searchParams.append("materialSearch[]", item);
      });
    }
    if (
      corrosionResistanceSearch &&
      Array.isArray(corrosionResistanceSearch) &&
      corrosionResistanceSearch.length > 0
    ) {
      corrosionResistanceSearch.forEach((item) => {
        searchParams.append("corrosionResistanceSearch[]", item);
      });
    }
    if (
      coatingSearch &&
      Array.isArray(coatingSearch) &&
      coatingSearch.length > 0
    ) {
      coatingSearch.forEach((item) => {
        searchParams.append("coatingSearch[]", item);
      });
    }
    if (
      applicationSearch &&
      Array.isArray(applicationSearch) &&
      applicationSearch.length > 0
    ) {
      applicationSearch.forEach((item) => {
        searchParams.append("applicationSearch[]", item);
      });
    }
    if (
      shankTypeSearch &&
      Array.isArray(shankTypeSearch) &&
      shankTypeSearch.length > 0
    ) {
      shankTypeSearch.forEach((item) => {
        searchParams.append("shankTypeSearch[]", item);
      });
    }
    if (
      headTypeSearch &&
      Array.isArray(headTypeSearch) &&
      headTypeSearch.length > 0
    ) {
      headTypeSearch.forEach((item) => {
        searchParams.append("headTypeSearch[]", item);
      });
    }
    if (
      threadTypeSearch &&
      Array.isArray(threadTypeSearch) &&
      threadTypeSearch.length > 0
    ) {
      threadTypeSearch.forEach((item) => {
        searchParams.append("threadTypeSearch[]", item);
      });
    }
    if (
      driveTypeSearch &&
      Array.isArray(driveTypeSearch) &&
      driveTypeSearch.length > 0
    ) {
      driveTypeSearch.forEach((item) => {
        searchParams.append("driveTypeSearch[]", item);
      });
    }
    if (
      pointTypeSearch &&
      Array.isArray(pointTypeSearch) &&
      pointTypeSearch.length > 0
    ) {
      pointTypeSearch.forEach((item) => {
        searchParams.append("pointTypeSearch[]", item);
      });
    }

    const url = `/product/get-all-products?${searchParams.toString()}`;

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
      // logoutUser();
      console.log(error.response);
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

  //TODO: Cannot upload file
  const uploadDrawing = async (drawing) => {
    dispatch({ type: UPLOAD_DRAWING_BEGIN });
    try {
      const { drawingName, version, revisedDate, modelName, file } = state;
      const formData = new FormData();
      formData.append("drawingName", drawingName);
      formData.append("version", version);
      formData.append("revisedDate", revisedDate);
      formData.append("modelName", modelName);
      formData.append("file", file);
      await authFetch.post(`/file/upload-drawing`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({ type: UPLOAD_DRAWING_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      // console.log(error.response);
      // If the user is not authorized, logout the user
      if (error.response.status !== 401) {
        dispatch({
          type: UPLOAD_DRAWING_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
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
        handleDateChange,
        handleFileChange,
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
        uploadDrawing,
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
