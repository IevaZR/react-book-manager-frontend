import React from "react";
import "./Navbar.css";
import Logo from "../../Assets/bookify-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/userSlice";

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }
  return (
    <div className="NavbarWrapper">
      <div className="NavbarLogoWrapper">
        <Link to="/">
          <img src={Logo} alt="Bookify-Logo" className="NavbarLogo" />
        </Link>
      </div>
      <div className="NavbarLinksWrapper">
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
          <button className="NavbarButton" type="button" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
