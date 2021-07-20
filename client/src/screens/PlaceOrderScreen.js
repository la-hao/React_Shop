import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { CART_EMPTY } from "../constants/cartConstants";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const cart = useSelector((state) => state.cart);

  if (!userLogin.userInfo) {
    props.history.push(`/signin?message=Please sign in to see this page`);
  } else if (!cart.paymentMethod) {
    props.history.push(`/payment?message=Please choose your payment method!`);
  }

  // const { shippingAddress } = cart;
  // const { cartItems } = cart;

  const { loading, error, success, order } = useSelector(
    (state) => state.orderCreate
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      console.log("order", order);
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
      dispatch({ type: CART_EMPTY });
    }
  }, [dispatch, order, props.history, success]);

  const toPrice = (num) => {
    return Number(num.toFixed(2));
  };

  const itemsCost = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  const shippingCost = itemsCost >= 100 ? toPrice(0) : toPrice(10);
  const taxCost = toPrice(0.15 * itemsCost);
  const totalCost = toPrice(itemsCost + shippingCost + taxCost);

  const submitHandler = () => {
    const checked = window.confirm("Confirm to check out?");
    if (checked) {
      const newOrder = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsCost,
        shippingCost,
        taxCost,
        totalCost,
      };
      dispatch(createOrder(newOrder));
    }
  };

  return (
    <div>
      <CheckoutSteps step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Shipping</h2>
              </li>
              <li>
                <strong>Full Name: </strong> {cart.shippingAddress?.fullName}
              </li>
              <li>
                <strong>Address: </strong>
                {cart.shippingAddress?.address}, {cart.shippingAddress?.city},{" "}
                {cart.shippingAddress?.postalCode},{" "}
                {cart.shippingAddress?.country}
              </li>
            </ul>
          </div>
          {/* Payment */}
          <div className="card card-body">
            <ul>
              <li>
                <h2>Payment</h2>
              </li>
              <li>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </li>
            </ul>
          </div>
          {/* Order Items */}
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Items</h2>
              </li>
              {cart.cartItems.length > 0 ? (
                cart.cartItems.map((item) => (
                  <li key={item.product}>
                    <div className="row">
                      <div>
                        <img
                          className="small"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className="min-30">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div>
                        {item.qty} X ${item.price} = ${item.qty * item.price}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li>
                  <MessageBox>
                    Your cart is empty! <Link to="/">Go shopping</Link>
                  </MessageBox>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${itemsCost}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping Cost</div>
                  <div>${shippingCost}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${taxCost}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${totalCost}</strong>
                  </div>
                </div>
              </li>
              <li>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <button
                  type="button"
                  className="primary block"
                  disabled={cart.cartItems.length <= 0 ? true : false}
                  onClick={submitHandler}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlaceOrderScreen;
