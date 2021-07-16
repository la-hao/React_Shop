import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_RESET_REGISTER } from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { ...state, error: action.payload, loading: false };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, message: "Create new account successfully!", loading: false, variant: "success", userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { ...state, message: action.payload, loading: false, variant: "danger" };
    case USER_RESET_REGISTER:
      return {};
    default:
      return state;
  }
}