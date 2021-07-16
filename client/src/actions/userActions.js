import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_RESET_REGISTER } from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  try {
    const { data } = await axios.post('/api/users/signin',
      {
        email,
        password
      });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      {
        type: USER_LOGIN_FAIL,
        payload: error.response && error.response.data.message ?
          error.response.data.message : error.message
      }
    )
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({ type: USER_LOGOUT });
  document.location.href = '/signin';
}

export const register = (email, password, name) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  try {
    const { data } = await axios.post('/api/users/register',
      {
        email,
        password,
        name
      });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch(
      {
        type: USER_REGISTER_FAIL,
        payload: error.response && error.response.data.message ?
          error.response.data.message : error.message
      }
    )
  }
}

export const resetRegister = () => (dispatch) => {
  dispatch({ type: USER_RESET_REGISTER });
}