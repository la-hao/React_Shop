import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/userConstants";

export const userReducer = (state = { user: { user: '', loading: true, message: '' } }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      return { message: "Login successfully!", loading: false, variant: "success" };
    case LOGIN_FAIL:
      return { message: action.payload, loading: false, variant: "danger" }
    default:
      return state;
  }
}