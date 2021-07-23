import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function OrderHistoryScreen(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);

  if (!userLogin.userInfo) {
    props.history.push(
      "/signin?returnURL=orderhistory&&message=Please sign in to see this page!"
    );
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/api/orders/mine", {
          headers: { authorization: `BEARER ${userLogin.userInfo.token}` },
        });
        const sortData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setList(sortData);
        setLoading(false);
      } catch (err) {
        setError(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
        setLoading(false);
      }
    }
    fetchData();
  }, [userLogin.userInfo]);

  const toDetailsHandler = (id) => {
    props.history.push(`/order/${id}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : list.length > 0 ? (
        <div>
          <h1>History Order</h1>
          <div className="row top">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.createdAt.slice(0, 10)}</td>
                    <td>{item.totalCost}</td>
                    <td>{item.isPaid ? item.paidAt : "NO"}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => toDetailsHandler(item._id)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <MessageBox>
          List is empty! <Link to="/">Go shopping</Link>
        </MessageBox>
      )}
    </div>
  );
}

export default OrderHistoryScreen;
