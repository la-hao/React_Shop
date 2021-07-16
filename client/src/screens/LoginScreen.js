import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import queryString from 'query-string';

function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, loading, userInfo } = useSelector(state => state.userLogin);
  // const returnURL = props.location.search.split('=')[1] || '';
  const { returnURL, message } = queryString.parse(props.location.search);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  useEffect(() => {
    if (userInfo) {
      const redirect = returnURL || '';
      props.history.push(`/${redirect}`);
    }
  }, [props.history, returnURL, userInfo]);

  return (
    <form className="form" onSubmit={e => submitHandler(e)}>
      <div className="form-title">
        <h1 >Sign In</h1>
      </div>
      {loading ?
        <div><LoadingBox></LoadingBox></div> : ''
      }
      {
        error && !loading ?
          <div><MessageBox variant="danger">
            {error}
          </MessageBox>
          </div> : ''
      }
      {
        message && !error
          ? <div><MessageBox>{message}</MessageBox></div>
          : ''
      }
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required
          placeholder="Please input your email"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          required
          placeholder="Please input your password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label />
        <button type="submit" className="btn primary block">Sign In</button>
      </div>
      <div>
        <label />
        <div>
          New Customer? <Link to={`/register?returnURL=${returnURL}`}>Creat new account</Link>
        </div>
      </div>
    </form>
  );
}

export default LoginScreen;