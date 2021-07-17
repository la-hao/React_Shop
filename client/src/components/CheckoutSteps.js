import React from "react";
import { Link } from "react-router-dom";

function CheckoutSteps(props) {
  return (
    <div className="checkout-steps">
      <div className="active">Sign-In</div>
      <div className={props.step2 && "active"}>
        {props.step3 ? (
          <Link to="/shipping" title="Back to shipping step">
            Shipping
          </Link>
        ) : (
          "Shipping"
        )}
      </div>
      <div className={props.step3 && "active"}>
        {props.step4 ? (
          <Link to="/payment" title="Back to payment step">
            Payment
          </Link>
        ) : (
          "Payment"
        )}
      </div>
      <div className={props.step4 && "active"}>Place Order</div>
    </div>
  );
}

export default CheckoutSteps;
