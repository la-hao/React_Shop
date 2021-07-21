import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, userUpdateProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileScreen(props) {
  const { userInfo } = useSelector((state) => state.userLogin);
  if (!userInfo) {
    props.history.push(
      "/signin?returnURL=profile&&message=Please sign in to see this page!"
    );
  }
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userUpdateProfile);
  const { loading, error, userDetails } = useSelector(
    (state) => state.userDetails
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userDetails) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser());
    } else {
      setName(userDetails.name);
      setEmail(userDetails.email);
    }
  }, [dispatch, userDetails, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Please check your confirm password!");
    } else {
      dispatch(userUpdateProfile({ name, email, password }));
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <form className="form" onSubmit={(e) => submitHandler(e)}>
            <div className="form-title">
              <h1>Your Profile</h1>
            </div>
            {loadingUpdate ? (
              <div>
                <LoadingBox></LoadingBox>
              </div>
            ) : errorUpdate ? (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            ) : (
              successUpdate && (
                <MessageBox variant="success">
                  Update profile successfully!
                </MessageBox>
              )
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Change your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm to change password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label />
              <button type="submit" className="primary block">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProfileScreen;
