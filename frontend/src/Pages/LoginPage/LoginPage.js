import React, { useEffect } from "react";
import "./LoginPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Photo from "./../../Assets/open-book-fiction.png";
import Login from "../../Components/Login/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/user");
    }
  }, []);
  return (
    <div className="LoginPageWrapper">
      <Navbar />
      <div className="LoginPageMainSectionWrapper">
        <Login />
        <div className="LoginPageImageWrapper">
          <img src={Photo} alt="books" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
