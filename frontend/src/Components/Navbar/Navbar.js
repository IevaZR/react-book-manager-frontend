import React, { useState } from "react";
import "./Navbar.css";
import Logo from "../../Assets/bookify-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/userSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showMobileNavLinks, setShowMobileNavLinks] = useState(false);

  const handleLogout = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL
    try {
      await axios.post(`${backendUrl}/user/logout-user`);
      localStorage.removeItem("user");
      dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="NavbarWrapper">
    <div className="NavbarLogoWrapper">
      <Link to="/">
        <img src={Logo} alt="Bookify-Logo" className="NavbarLogo" />
      </Link>
    </div>

    <div
      className="NavbarMobileIconWrapper"
      onClick={() => setShowMobileNavLinks(!showMobileNavLinks)}
    >
      <RxHamburgerMenu className="NavbarMobileIcon" />
    </div>

    <div
      className={`NavbarLinksWrapper ${
        showMobileNavLinks ? "NavbarMobile" : ""
      }`}
    >
      <Link to="/" className="NavbarLink">
        Home
      </Link>
      <Link to="/books" className="NavbarLink">
        Book TOP
      </Link>
      <Link to="/user" className="NavbarLink">
        My Books
      </Link>
      {!currentUser && (
        <Link to="/login" className="NavbarLink">
          Login
        </Link>
      )}
      {currentUser && (
        <button className="NavbarButton" type="button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  </div>
  );
};

export default Navbar;
