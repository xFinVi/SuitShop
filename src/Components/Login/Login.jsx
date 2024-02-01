import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "../../redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

 const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      // Make an API call to your backend for authentication
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}users/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Logged in user:", response.data);
        console.log(response.data);
        dispatch(setUser(response.data));
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Error during login:", err.message);

      if (err.response && err.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Error during login. Please try again.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="login-container">
        <h2 className="login-heading">Hello</h2>
        {error && <p className="error-message"> {error} </p>}

        <div className="login-links">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              "login-route" + (isActive ? " activated" : "")
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              "login-route" + (isActive ? " activated" : "")
            }
          >
            Sign Up
          </NavLink>
        </div>

        <form className="login-form">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="currentPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="login-btn"
            disabled={isLoading}
            onClick={handleLogin}
          >
            {!isLoading ? "Logging in" : "Log in"}
          </button>
        </form>
        <Link to="/signup" className="signup-link">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default Login;
