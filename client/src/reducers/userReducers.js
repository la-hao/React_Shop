import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESET_REGISTER,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from "../constants/userConstants";

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
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        message: "Create new account successfully!",
        loading: false,
        variant: "success",
        userInfo: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        message: action.payload,
        loading: false,
        variant: "danger",
      };
    case USER_RESET_REGISTER:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, userDetails: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
