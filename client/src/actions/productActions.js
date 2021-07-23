import axios from "axios";
import {
  PRODUCT_CAT_FAIL,
  PRODUCT_CAT_REQUEST,
  PRODUCT_CAT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProducts =
  ({
    name = "",
    category = "",
    min = 0,
    max = 0,
    rating = 0,
    order = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await axios.get(
        `/api/products?name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&pageNumber=${pageNumber}&order=${order}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productId,
  });
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const catProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CAT_REQUEST });
    const { data } = await axios.get("/api/products/categories");
    dispatch({ type: PRODUCT_CAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CAT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
