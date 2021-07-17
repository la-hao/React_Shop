import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import MessageBox from "../components/MessageBox";

function PlaceOrderScreen(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { cartItems } = cart;

  if (!cart.paymentMethod) {
    props.history.push(`/payment?message=Please choose your payment method!`);
  }

  if (!userLogin) {
    props.history.push(`/signin?message=Please sign in to see this page`);
  }

  const submitHandler = () => {
    window.confirm("Confirm to check out?");
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
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
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
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
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
                  <div>
                    ${cartItems.reduce((a, c) => a + c.qty * c.price, 0)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping Cost</div>
                  <div>${0}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${19.5}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    ${cartItems.reduce((a, c) => a + c.qty * c.price, 0)}
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  className="primary block"
                  disabled={cartItems.length <= 0 ? true : false}
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
