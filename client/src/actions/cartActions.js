import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addCartItem = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${productId}`);
  const cartItem = {
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    product: data._id,
    qty,
  }
  dispatch({ type: CART_ADD_ITEM, payload: cartItem });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeCartItem = (productId) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}