/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../../redux/auth/authSlice';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signUp(formData));
      setTimeout(() => {
        if (!error) {
          navigate('/home');
        }
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="body-auth">
      <h2 className="auth-h2">SIGN UP</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        <div>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            className="auth-input"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
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
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            className="auth-input"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" className="auth-btn">Sign Up</button>
        </div>
        <div>
          <p className="auth-p">
            Register as a new user?
            <Link to="/" className="navAnchor-2">
              Sign In
            </Link>
          </p>
        </div>
      </form>
      <div className="overlay" />
    </div>
  );
}

export default Signup;