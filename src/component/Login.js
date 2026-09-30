// src/pages/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr(false);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginHeader">
        <h1 className="brand-title">Cinemix</h1>
        <p className="subtitle">Welcome back to the world of movies!</p>
      </div>

      <div className="login-container">
        <form onSubmit={handleLogin}>
          {/* Email Input with Icon */}
          <div className="inputWithIcon">
            <img
              src={require("../assets/email.png")}
              alt="Email Icon"
              className="icon-img"
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input with Icon */}
          <div className="inputWithIcon">
            <img
              src={require("../assets/lock.png")}
              alt="Password Icon"
              className="icon-img"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="forgot-password">
            <Link to="/forgot">Forgot Password?</Link>
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-button">
            Sign In
          </button>

          {/* Error Message */}
          {err && <span className="error">Invalid credentials. Please try again.</span>}
        </form>

        {/* Sign Up Link */}
        <div className="signup-link">
          <span>Don't have an account?</span>
          <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
