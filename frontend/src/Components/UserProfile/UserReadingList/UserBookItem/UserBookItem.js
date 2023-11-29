import React, { useEffect } from "react";
import "./UserBookItem.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../../../Redux/userSlice";
import axios from "axios";

const UserBookItem = ({ book }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const removeFromMyBooks = () => {
    let updatedUserReadingList = [...currentUser.readingListBooks];

    let bookIndexInArray = updatedUserReadingList.findIndex(
      (bookItem) => bookItem.title === book.title
    );

    updatedUserReadingList.splice(bookIndexInArray, 1);

    let updatedUser = {
      ...currentUser,
      readingListBooks: updatedUserReadingList,
    };

    dispatch(setCurrentUser(updatedUser));

    updateUserInDB(updatedUser);
  };

  const moveToFinishedBooks = () => {
    let updatedUserReadingList = [...currentUser.readingListBooks];
    let updatedUserFinishedList = [...currentUser.finishedBooks];

    let bookIndexInReadingListArray = updatedUserReadingList.findIndex(
      (bookItem) => bookItem.title === book.title
    );

    updatedUserReadingList.splice(bookIndexInReadingListArray, 1);
    updatedUserFinishedList.push(book);

    let updatedUser = {
      ...currentUser,
      readingListBooks: updatedUserReadingList,
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
    <div className="UserBookItemWrapper">
      <div>
        <div className="UserBookImageWrapper">
          <img
            src={book.bookCover}
            alt="book-cover"
            className="UserBookImage"
          />
        </div>
        <h5>{book.title}</h5>
        <p>by {book.author}</p>
      </div>

      <div className="UserBookItemButtonsWrapper">
        <button
          className="UserBookItemRemoveButton"
          onClick={removeFromMyBooks}
        >
          Remove
        </button>
        <button
          className="UserBookItemMarkAsReadButton"
          type="button"
          onClick={moveToFinishedBooks}
        >
          Mark as Read
        </button>
      </div>
    </div>
  );
};

export default UserBookItem;
