import queryString from "query-string";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import MessageBox from "../components/MessageBox";

function ShippingScreen(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { message } = queryString.parse(props.location.search);
  if (!userLogin.userInfo) {
    props.history.push(`/signin?message=Please sign in to see this page`);
  }

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullName, setFullName] = useState(shippingAddress?.fullName || "");
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };

  return (
    <div>
      <CheckoutSteps step2></CheckoutSteps>
      <form className="form" onSubmit={(e) => submitHandler(e)}>
        <div className="form-title">
          <h1>Shipping Address</h1>
        </div>
        {message && (
          <div>
            <MessageBox>{message}</MessageBox>
          </div>
        )}
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            value={fullName}
            type="text"
            id="fullName"
            required
            placeholder="Please input your full name"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            value={address}
            type="text"
            id="address"
            required
            placeholder="Please input your address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            value={city}
            type="text"
            id="city"
            required
            placeholder="Please input your city"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            value={postalCode}
            type="text"
            id="postalCode"
            required
            placeholder="Please input your postal code"
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            value={country}
            type="text"
            id="country"
            required
            placeholder="Please input your country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <button type="button" className="block">
            Choose On Map
          </button>
        </div>
        <div>
          <label />
          <button type="submit" className="btn primary block">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingScreen;
