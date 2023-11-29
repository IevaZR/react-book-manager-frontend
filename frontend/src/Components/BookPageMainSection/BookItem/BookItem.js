import React, { useEffect, useState } from "react";
import "./BookItem.css";
import { useSelector } from "react-redux";
import AboutBookPopup from "./AboutBookPopup/AboutBookPopup";
import AddToFavouritesBtn from "../../AddToFavouritesBtn/AddToFavouritesBtn";
import RemoveFromFavouritesBtn from "../../RemoveFromFavouritesBtn/RemoveFromFavouritesBtn";
import { Link } from "react-router-dom";

const BookItem = ({ book, index, openAboutBook }) => {
  const [bookCover, setBookCover] = useState("");
  const [GoogleBookInfo, setGoogleBookInfo] = useState();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [bookInUserReadinList, setbookInUserReadinList] = useState(false);
  const [bookInUserFinishedBookList, setbookInUserFinishedBookList] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (book) {
      fetchGoogleBookData();
    }
    if (currentUser) {
      isBookInUserBooksList();
      isBookInUserFinishedBooksList()
    }
    // setBookCover(
    //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoGC9MuJKNcUQVn1DB9w57JWZkTrjhLbKx-Q&usqp=CAU"
    // );
  }, []);

  const fetchGoogleBookData = () => {
    if (book) {
      const ISBN = book?.book_details[0].primary_isbn10;
      const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
      fetch(
        "https://www.googleapis.com/books/v1/volumes?q=isbn:" +
          ISBN +
          "&key=" +
          apiKey,
        { method: "get" }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data && data.items && data.items.length > 0) {
            const bookCoverURL = data?.items[0].volumeInfo.imageLinks.thumbnail;
            setBookCover(bookCoverURL);
            setGoogleBookInfo(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching book cover:", error);
        });
    }
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const isBookInUserBooksList = () => {
    let userBooks = currentUser.readingListBooks;
    let currentBookTitle = book.book_details[0].title;
    const bookInUserBooksList = userBooks.some((userBook) => {
      return userBook.title === currentBookTitle;
    });
    setbookInUserReadinList(bookInUserBooksList);
  };

  const isBookInUserFinishedBooksList = () => {
    let userBooks = currentUser.finishedBooks;
    let currentBookTitle = book.book_details[0].title;
    const bookInUserFinishedBooksList = userBooks.some((userBook) => {
      return userBook.title === currentBookTitle;
    });
    setbookInUserFinishedBookList(bookInUserFinishedBooksList);
  };

  const updatedUserReadingList = (value) => {
    setbookInUserReadinList(value);
  };

  return (
    <div className="BookWrapper">
      <div className="BookImageWrapper" onClick={openPopup}>
        {bookCover ? (
          <img src={bookCover} alt="book-cover" className="BookImage" />
        ) : (
          <img
            src=" https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-loading-icon-vector-transparent-png-image_5687537.png"
            alt="book-cover-loading"
            className="BookImageLoading"
          />
        )}
      </div>
      <div className="BookItemInfoWrapper">
        <h5 onClick={openPopup}>{book?.book_details[0].title}</h5>
        <p className="BookInfo">by {book?.book_details[0].author}</p>
        <p className="BookInfo">Weeks on TOP: {book?.weeks_on_list}</p>
      </div>
      <div>
        {currentUser && (
          <div>
            {!bookInUserReadinList && !bookInUserFinishedBookList && (
              <AddToFavouritesBtn
                book={book}
                bookCover={bookCover}
                updatedUserBooksList={updatedUserReadingList}
              />
            )}
            {/* {bookInUserReadinList || bookInUserFinishedBookList && (
              <RemoveFromFavouritesBtn
                book={book}
                bookCover={bookCover}
                updatedUserBooksList={updatedUserReadingList}
              />
            )} */}
            {(bookInUserFinishedBookList || bookInUserReadinList) && (
              <button className="BookAlreadyInMyBooks" disabled="true">Book already in My Books list</button>
            )} 
          </div>
        )}
        {!currentUser && <button className="BookItemLinkToLoginBtn WhiteBtn"><Link to="/login">Add to My Books</Link></button>}
      </div>

      <div className="BookNumber">
        <p>{index + 2}</p>
      </div>
      {isPopupOpen && (
        <AboutBookPopup
          book={book}
          bookCover={bookCover}
          googleBookInfo={GoogleBookInfo}
          closePopup={closePopup}
          updatedUserBooksList={updatedUserReadingList}
          bookInUserList={bookInUserReadinList}
        />
      )}
    </div>
  );
};

export default BookItem;
