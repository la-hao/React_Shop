import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register, resetRegister } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function RegisterScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  let { message, loading, variant, userInfo } = useSelector(state => state.userRegister);
  const returnURL = props.location.search.split('=')[1] || '';

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(email, password, name));
  }

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        dispatch(resetRegister());
        props.history.push(`/signin?returnURL=${returnURL}`);
      }, 1000);
    }
  }, [props.history, returnURL, userInfo, dispatch]);

  return (
    <form className="form" onSubmit={e => submitHandler(e)}>
      <div className="form-title">
        <h1 >Create New Account</h1>
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
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          required
          placeholder="Please input your name"
          onChange={e => setName(e.target.value)}
        />
      </div>
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
        <button type="submit" className="btn primary block">Register</button>
      </div>
      <div>
        <label />
        <div>
          Already have account? <Link to={`/signin?returnURL=${returnURL}`}>Log in</Link>
        </div>
      </div>
    </form>
  );
}

export default RegisterScreen;