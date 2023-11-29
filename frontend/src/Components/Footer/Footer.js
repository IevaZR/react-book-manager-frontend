import React, { useState } from "react";
import "./Footer.css";
import axios from "axios";

const Footer = () => {
  const [showThankYouMsg, setShowThankYouMsg] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const email = event.target.value;
    setInputValue(email);
  };

  const handleSubscribeBtnClick = async () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (inputValue.match(emailRegex)) {
      try {
        await axios.post("http://localhost:3009/email/add-email", {
          email: inputValue,
        });
      } catch (error) {
        console.log(error);
      }
      setInputValue("")
      setShowThankYouMsg(true);
      setShowErrorMsg(false);
    } else {
      setShowErrorMsg(true);
    }
  };

  return (
    <div className="FooterWrapper">
      <div className="FooterNewsletterWrapper">
        <h6>Subsribe to our newsletter</h6>
        <input
          placeholder="Email"
          name="email"
          value={inputValue}
          onChange={handleInputChange}
        />
        {showThankYouMsg && <p>Thank you for subscribing!</p>}
        {showErrorMsg && <p className="ErrorMsg">Email not valid</p>}

        <button type="button" className="FooterButton BlackBtn" onClick={handleSubscribeBtnClick}>
          Submit
        </button>
      </div>
      <div className="FooterContactInfoWrapper">
        <h6>Contacts</h6>
        <p>123 Main Street, City</p>
        <p>+123 45678 910</p>
        <p>info@bookify.com</p>
      </div>
    </div>
  );
};

export default Footer;
