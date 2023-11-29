import React from 'react'
import "./BookPage.css"
import Navbar from '../../Components/Navbar/Navbar'
import BookPageMainSection from '../../Components/BookPageMainSection/BookPageMainSection'
import Footer from '../../Components/Footer/Footer'

const BookPage = () => {
  return (
    <div className='BookPageWrapper'>
      <Navbar/>
      <BookPageMainSection/>
      <Footer/>
    </div>
  )
}

export default BookPage