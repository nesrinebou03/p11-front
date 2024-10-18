import { useState } from "react";
import "./LoginForm.css";

import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/auth";
import { useNavigate } from 'react-router-dom'


// eslint-disable-next-line react/prop-types
export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "tony@stark.com",
    password: "password123",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleLogin(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.body.token) {
      dispatch(setToken(data.body.token));
      navigate('/user')
    }
  
    } 
  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleLogin}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>

      </form>
    </section>
  )
}