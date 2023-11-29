import React from "react";
import "./RemoveFromFavouritesBtn.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../Redux/userSlice";
import axios from "axios";

const RemoveFromFavouritesBtn = ({ book, bookCover, updatedUserBooksList }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const removeFromMyBooks = () => {
    let currentBook = {
      title: book.book_details[0].title,
      author: book.book_details[0].author,
      bookCover: bookCover,
      rating: null,
    };
    let updatedUserReadingList = [...currentUser.readingListBooks];

    let bookIndexInArray = updatedUserReadingList.findIndex(
      (book) => book.title === currentBook.title
    );

    updatedUserReadingList.splice(bookIndexInArray, 1);

    let updatedUser = {
      ...currentUser,
      readingListBooks: updatedUserReadingList,
    };

    dispatch(setCurrentUser(updatedUser));
    updatedUserBooksList(false);

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
    <button
      className="RemoveFromMyBooksBtn"
      type="button"
      onClick={removeFromMyBooks}
    >
      Remove from My Books
    </button>
  );
};

export default RemoveFromFavouritesBtn;
