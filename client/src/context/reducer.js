import { DISPLAY_ALERT, CLEAR_ALERT } from "./action";

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
    default:
      return state;
  }
};

export default reducer;
