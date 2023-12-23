/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../../redux/auth/authSlice';

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(formData));
    setTimeout(() => {
      if (!error) {
        navigate('/home');
      }
    }, 2000);
  };

  return (
    <div className="body-auth">
      <h2 className="auth-h2">SignIn</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="auth-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" className="auth-btn">Sign In</button>
        </div>
        <div>
          <p className="auth-p">
            Already have account?
            <Link to="/sign_up" className="navAnchor-2">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
      <div className="overlay" />
    </div>
  );
}

export default Signin;