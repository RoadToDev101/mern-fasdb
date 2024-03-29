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
  HANDLE_CHANGE,
  CHANGE_PAGE,
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

import { initialState } from "./appContext";

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertText: "Please provide all values!",
        alertType: "danger",
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertText: "",
        alertType: "",
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        companySearch: [],
        productNameSearch: "",
        productLineSearch: [],
        sortBy: "a-z",
      };
    case HANDLE_CHANGE:
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };
    case SETUP_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,

        showAlert: true,
        alertType: "success",
        alertText: action.payload.alertText,
      };
    case SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertText: action.payload.msg,
        alertType: "danger",
      };
    case GET_CURRENT_USER_BEGIN:
      return {
        ...state,
        userLoading: true,
        showAlert: false,
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        user: action.payload.user,
      };
    case UPDATE_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        showAlert: true,
        alertType: "success",
        alertText: "User updated successfully!",
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertText: action.payload.msg,
        alertType: "danger",
      };
    case LOGOUT_USER:
      return {
        ...initialState,
        userLoading: false,
      };
    case TOGGLE_BIG_SIDEBAR:
      return {
        ...state,
        showBigSideBar: !state.showBigSideBar,
      };
    case TOGGLE_SMALL_SIDEBAR:
      return {
        ...state,
        showSmallSideBar: !state.showSmallSideBar,
      };
    case CLEAR_VALUES:
      return {
        ...state,
        editProductId: "",
        productLine: "",
        modelName: "",
        company: "",
      };
    case CREATE_PRODUCT_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Product created successfully!",
      };
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertText: action.payload.msg,
        alertType: "danger",
      };
    case GET_PRODUCTS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload.products,
        totalProducts: action.payload.totalProducts,
        numOfPages: action.payload.numOfPages,
      };
    case SET_EDIT_PRODUCT:
      const product = state.products.find(
        (product) => product._id === action.payload.id
      );
      const { _id, isActive, productLine, modelName, company } = product;
      return {
        ...state,
        selectedProductId: _id,
        isActive,
        productLine,
        modelName,
        company,
      };
    case EDIT_PRODUCT_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Product updated successfully!",
      };
    case EDIT_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertText: action.payload.msg,
        alertType: "danger",
      };
    case DELETE_PRODUCT_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case UPLOAD_DRAWING_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case UPLOAD_DRAWING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Drawing uploaded successfully!",
      };
    case UPLOAD_DRAWING_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertText: action.payload.msg,
        alertType: "danger",
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default reducer;
