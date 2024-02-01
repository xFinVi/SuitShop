import React, { useState } from "react";
import { Link, NavLink,useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}users/`, {
       first_name: firstName,
       last_name: lastName,
        email,
        password,
      });
  
      if (response.status === 201) {
        console.log("User created successfully");
        navigate('/login');
      } else {
        console.error("Error signing up: " + response.statusText);
      }
    } catch (err) {
      console.error("Error signing up:", err.message);
    }
  };
    

  return (
    <>
      <div className="sign-container">
        <h2 className="sign-heading">Hello</h2>
        <div className="sign-links">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              "sign-route" + (isActive ? " activated" : "")
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              "sign-route" + (isActive ? " activated" : "")
            }
          >
            Sign Up
          </NavLink>
        </div>

        <form className="sign-form" onSubmit={handleSignUp}>
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            autoComplete="current-password" // Add this line
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="sign-btn">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
