import React, { useEffect } from "react";
import "./UserPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import UserProfile from "../../Components/UserProfile/UserProfile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="UserPageWrapper">
      <Navbar />
      {currentUser && (
        <div className="UserPageMainSectionWrapper">
          <h1>Hello, {currentUser.firstName}!</h1>
          <UserProfile />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserPage;
