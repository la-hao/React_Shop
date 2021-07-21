import axios from "axios";
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
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  try {
    const { data } = await axios.post("/api/users/signin", {
      email,
      password,
    });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/signin?message=Sign out successfully!";
};

export const register = (email, password, name) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  try {
    const { data } = await axios.post("/api/users/register", {
      email,
      password,
      name,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetRegister = () => (dispatch) => {
  dispatch({ type: USER_RESET_REGISTER });
};

export const detailsUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.get(`/api/users/profile`, {
      headers: { authorization: `BEARER ${userInfo.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userUpdateProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.put(`/api/users/profile`, user, {
      headers: { authorization: `BEARER ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
