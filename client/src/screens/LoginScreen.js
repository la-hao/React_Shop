import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { message, loading, variant } = useSelector(state => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <form className="form" onSubmit={e => submitHandler(e)}>
      <div className="form-title">
        <h1 >Sign In</h1>
      </div>
      {loading ?
        <div><LoadingBox></LoadingBox></div> : ''
      }
      {
        message ?
          <div><MessageBox variant={variant}>
            {message}
          </MessageBox>
          </div> : ''
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
          New Customer? <Link to="/register">Creat new account</Link>
        </div>
      </div>
    </form>
  );
}

export default LoginScreen;