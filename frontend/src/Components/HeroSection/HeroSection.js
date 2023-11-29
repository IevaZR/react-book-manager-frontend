import React from "react";
import "./HeroSection.css";
import BookReadersCollage from "../../Assets/book-readers-collage.jpg"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className="HeroSectionWrapper">
      <h1 className="HeroSectionHeading">Dicover Must-Reads: The Best Sellers Collection</h1>
      <p className="HeroSectionText">
        Welcome to Bookify, your ultimate destination to explore and find the
        top fiction and non-fiction books available.{" "}
      </p>
      {!currentUser && <div className="HeroSectionButtonsWrapper">
        <button className="HeroSectionButton WhiteBtn"><Link to="/login">Login</Link></button>
        <button className="HeroSectionButton BlackBtn"><Link to="/register">Join Now</Link></button>
      </div>}
      {currentUser && <div className="HeroSectionButtonsWrapper">
        <button className="HeroSectionButton LogedInBtn WhiteBtn"><Link to="/user">Go to My Books Page</Link></button>
      </div>}
      {/* <div className="HeroSectionImageWrapper"> */}
        {/* <img src={BookReadersCollage} alt="Book-readers"/> */}
      {/* </div> */}
    </div>
  );
};

export default HeroSection;
