import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowProfileMenu(false);
    navigate("/");
  };

  const handleOrders = () => {
    setShowProfileMenu(false);
    navigate("/order");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="Navbar">
      <Link to="/" className="navbar-logo-link" onClick={() => setMenu("home")}>
        <img src={assets.logo} alt="Tamato" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/">
          <li
            onClick={() => setMenu("home")}
            className={menu === "home" ? "Active" : ""}
          >
            home
          </li>
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "Active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "Active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "Active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0? "":"dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div
            ref={profileRef}
            className="navbar-profile"
            onClick={() => setShowProfileMenu((prev) => !prev)}
          >
            <img src={assets.profile_icon} alt="profile" />
            <ul className={showProfileMenu ? "nav-profile-dropdown active" : "nav-profile-dropdown"}>
              <li onClick={handleOrders}>
                <img src={assets.bag_icon} alt="orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
       
      </div>
    </div>
  );
};

export default Navbar;
