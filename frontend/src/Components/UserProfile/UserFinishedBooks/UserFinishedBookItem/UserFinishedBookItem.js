import React, { useEffect } from "react";
import "./UserFinishedBookItem.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../../../Redux/userSlice";
import axios from "axios";
import BookRating from "../../../BookRating/BookRating";

const UserFinishedBookItem = ({ book }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const removeBookFromUserBookLists = () => {
    let updatedUserFinishedBooks = [...currentUser.finishedBooks];

    let bookIndexInArray = updatedUserFinishedBooks.findIndex(
      (bookItem) => bookItem.title === book.title
    );

    updatedUserFinishedBooks.splice(bookIndexInArray, 1);

    let updatedUser = {
      ...currentUser,
      finishedBooks: updatedUserFinishedBooks,
    };

    dispatch(setCurrentUser(updatedUser));

    updateUserInDB(updatedUser);
  };

  const moveToReadingList = () => {
    let updatedUserFinishedList = [...currentUser.finishedBooks];
    let updatedUserReadingList = [...currentUser.readingListBooks];

    let bookIndexInFinishedBooksArray = updatedUserFinishedList.findIndex(
      (bookItem) => bookItem.title === book.title
    );

    updatedUserFinishedList.splice(bookIndexInFinishedBooksArray, 1);
    updatedUserReadingList.push(book);

    let updatedUser = {
      ...currentUser,
      readingListBooks: updatedUserReadingList,
      finishedBooks: updatedUserFinishedList,
    };

    dispatch(setCurrentUser(updatedUser));

    updateUserInDB(updatedUser);
  };

  const saveRating = (ratingValue) => {
    let updatedBook = { ...book, rating: ratingValue };
    let updatedUserFinishedList = [...currentUser.finishedBooks];

    let bookIndexInFinishedBooksArray = updatedUserFinishedList.findIndex(
      (bookItem) => bookItem.title === book.title
    );

    updatedUserFinishedList[bookIndexInFinishedBooksArray] = updatedBook;

    let updatedUser = {
      ...currentUser,
      finishedBooks: updatedUserFinishedList,
    };

    dispatch(setCurrentUser(updatedUser));

    updateUserInDB(updatedUser);
  };

  const updateUserInDB = async (updatedUser) => {
    try {
      await axios.put(
        `http://localhost:3009/user/update-user/${updatedUser.email}`,
        updatedUser
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="UserFinishedBookItemWrapper">
      <div className="UserFinishedBookImageWrapper">
        <img src={book?.bookCover} alt="book-cover" className="UserBookImage" />
      </div>
      <h5>{book?.title}</h5>
      <p>by {book?.author}</p>
      <div className="UserFinishedBookItemButtonsWrapper">
        <button
          className="UserFinishedBookItemRemoveButton"
          type="button"
          onClick={removeBookFromUserBookLists}
        >
          Delete
        </button>
        <button
          className="UserFinishedBookItemMarkAsReadButton"
          type="button"
          onClick={moveToReadingList}
        >
          Move to Unfinished
        </button>
      </div>
      <div className="FinishedBookRatingWrapper">
        <p>My Rating</p>
        <BookRating saveRating={saveRating} currentRating={book.rating} />
      </div>
    </div>
  );
};

export default UserFinishedBookItem;
