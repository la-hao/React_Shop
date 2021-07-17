import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import queryString from "query-string";
import MessageBox from "../components/MessageBox";

function PaymentScreen(props) {
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { message, returnURL } = queryString.parse(props.location.search);
  const redirect = returnURL || "payment";

  if (!cart.shippingAddress) {
    props.history.push(
      `/shipping?returnURL=${redirect}&&message=Please fulfill your shipping address!`
    );
  }

  if (!userLogin.userInfo) {
    props.history.push(`/signin?message=Please sign in to see this page !`);
  }

  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState(
    cart.paymentMethod || "paypal"
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step2 step3></CheckoutSteps>
      <form className="form" onSubmit={(e) => submitHandler(e)}>
        <div className="form-title">
          <h1>Payment</h1>
        </div>
        {message && (
          <div>
            <MessageBox>{message}</MessageBox>
          </div>
        )}
        <div>
          <div className="payment">
            <input
              type="radio"
              id="paypal"
              checked={paymentMethod === "paypal"}
              name="payment"
              value="paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">Paypal</label>
          </div>
          <div className="payment">
            <input
              type="radio"
              id="stripe"
              name="payment"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <button className="primary block" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentScreen;
