import React, { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [err, setErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");

    const displayName = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPass = e.target.confirmPassword.value;
    const termsAgreed = e.target.terms.checked;

    if (!termsAgreed) {
      setErr("You must agree to the Terms and Conditions.");
      return;
    }

    if (password !== confirmPass) {
      setErr("Passwords do not match.");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
      });

      navigate("/success");
    } catch (error) {
      setErr("Registration failed. Please try again.");
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleRegister} className="form">
        <div className="back-page-icon">
          <div className="back-img-size">
            <Link to="/login" className="back-button">
              <img
                src={require("../assets/back.png")}
                alt="Back"
                className="icon-img"
              />
            </Link>
          </div>
        </div>

        <h2>Create Account</h2>
        <p>Book tickets, get exclusive deals, and enjoy the show!</p>

        {err && <div className="formError">{err}</div>}

        <div className="inputGroup">
          <img
            src={require("../assets/name.png")}
            alt="Full Name"
            className="field-icon"
          />
          <input required name="name" type="text" placeholder="Full Name" />
        </div>

        <div className="inputGroup">
          <img
            src={require("../assets/email.png")}
            alt="Email"
            className="field-icon"
          />
          <input
            required
            name="email"
            type="email"
            placeholder="Email Address"
          />
        </div>

        <div className="inputGroup">
          <img
            src={require("../assets/lock.png")}
            alt="Password"
            className="field-icon"
          />
          <input
            required
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>

        <div className="inputGroup">
          <img
            src={require("../assets/lock.png")}
            alt="Confirm Password"
            className="field-icon"
          />
          <input
            required
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <label className="terms">
          <input type="checkbox" name="terms" required /> I agree to the <a href="#">Terms</a>
          and <a href="#">Conditions</a>
        </label>

        <button type="submit">Create Account</button>

        <p className="footerText">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
