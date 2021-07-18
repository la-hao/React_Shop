import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function OrderScreen(props) {
  const userLogin = useSelector((state) => state.userLogin);

  if (!userLogin.userInfo) {
    props.history.push(`/signin?message=Please sign in to see this page`);
  }

  const dispatch = useDispatch();
  const orderId = props.match.params.id;
  const { loading, error, order } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        order && (
          <div>
            <h1>Order {order._id}</h1>
            <div className="row top">
              <div className="col-2">
                <div className="card card-body">
                  <ul>
                    <li>
                      <h2>Shipping</h2>
                    </li>
                    <li>
                      <strong>Full Name: </strong>{" "}
                      {order.shippingAddress.fullName}
                    </li>
                    <li>
                      <strong>Address: </strong>
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </li>
                    <li>
                      {!order.isDelivered ? (
                        <MessageBox variant="danger">Not Delivered</MessageBox>
                      ) : (
                        <MessageBox variant="success">Delivered</MessageBox>
                      )}
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
                      {order.paymentMethod}
                    </li>
                    <li>
                      {!order.isPaid ? (
                        <MessageBox variant="danger">Not Paid</MessageBox>
                      ) : (
                        <MessageBox variant="success">Paid</MessageBox>
                      )}
                    </li>
                  </ul>
                </div>
                {/* Order Items */}
                <div className="card card-body">
                  <ul>
                    <li>
                      <h2>Order Items</h2>
                    </li>
                    {order.orderItems.length > 0 ? (
                      order.orderItems.map((item) => (
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
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>
                            <div>
                              {item.qty} X ${item.price} = $
                              {item.qty * item.price}
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
                        <div>${order.itemsCost}</div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>Shipping Cost</div>
                        <div>${order.shippingCost}</div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>Tax</div>
                        <div>${order.taxCost}</div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>
                          <strong>Order Total</strong>
                        </div>
                        <div>
                          <strong>${order.totalCost}</strong>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
export default OrderScreen;
