import axios from "axios"
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/userConstants"

export const login = (email, password) => async (dispatch, getState) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post('/api/users/signin',
      {
        email,
        password
      });
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem('user', JSON.stringify(getState().user));
  } catch (error) {
    dispatch(
      {
        type: LOGIN_FAIL,
        payload: error.response && error.response.data.message ?
          error.response.data.message : error.message
      }
    )
  }
}