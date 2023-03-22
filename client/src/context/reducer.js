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
        token: action.payload.token,
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
        user: null,
        token: null,
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
    default:
      return state;
  }
};

export default reducer;
