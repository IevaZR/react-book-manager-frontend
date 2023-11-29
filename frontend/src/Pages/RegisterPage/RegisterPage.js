import React from 'react'
import "./RegisterPage.css"
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Photo from "./../../Assets/open-book-nonfiction.png";
import Register from '../../Components/Register/Register';

const RegisterPage = () => {
  return (
    <div className='RegisterPageWrapper'>
        <Navbar/>
        <div className="RegisterPageMainSectionWrapper">
        <Register />
        <div className="RegisterPageImageWrapper">
          <img src={Photo} alt="books" />
        </div>
      </div>
        <Footer/>
    </div>
  )
}

export default RegisterPage