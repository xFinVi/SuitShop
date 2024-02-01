import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { CiLogin, CiShoppingCart, CiUser } from "react-icons/ci";
import Logout from "../Logout/Logout";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isAdmin = useSelector(
    (state) => state.user?.value?.user?.role === "admin"
  );

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}></Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-link">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " activated" : "")
              }
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " activated" : "")
              }
              onClick={closeMobileMenu}
            >
              Products
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " activated" : "")
              }
              onClick={closeMobileMenu}
            >
              BestSellers
            </NavLink>
          </li>
          {isAdmin && (
            <li className="nav-link">
              <NavLink
                to="/products/addProduct"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " activated" : "")
                }
                onClick={closeMobileMenu}
              >
                Add Product
              </NavLink>
            </li>
          )}

          {isAuthenticated ? (
            <>            <li className="nav-link">
              <NavLink
                to="/userprofile"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " activated" : "")
                }
                onClick={closeMobileMenu}
              >
                <CiUser />
              </NavLink>
            </li>
   
            </>

          ) : (
            <li className="nav-link">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " activated" : "")
                }
                onClick={closeMobileMenu}
              >
                <CiLogin />
              </NavLink>
            </li>
          )}
          <li className="nav-link">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " activated" : "")
              }
              onClick={closeMobileMenu}
            >
              <CiShoppingCart />
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
