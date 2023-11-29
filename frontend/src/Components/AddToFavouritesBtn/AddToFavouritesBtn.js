import React, { useState } from "react";
import "./AddToFavouritesBtn.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../Redux/userSlice";
import axios from "axios";

const AddToFavouritesBtn = ({ book, bookCover, updatedUserBooksList }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const addToMyBooks = () => {
    let currentBook = {
      title: book.book_details[0].title,
      author: book.book_details[0].author,
      bookCover: bookCover,
      rating: null,
    };
    let currentUserReadingList = currentUser.readingListBooks;
    let updatedCurrentUserReadingList =
      currentUserReadingList.concat(currentBook);
    let updatedUser = {
      ...currentUser,
      readingListBooks: updatedCurrentUserReadingList,
    };

    dispatch(setCurrentUser(updatedUser));
    updatedUserBooksList(true)

    updateUserInDB(updatedUser);
  };

  const updateUserInDB = async (updatedUser) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL
    try {
      await axios.put(
        `${backendUrl}/user/update-user/${updatedUser.email}`,
        updatedUser
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="AddToFavouritesBtn WhiteBtn" type="button" onClick={addToMyBooks}>
      Add to My Books
    </button>
  );
};

export default AddToFavouritesBtn;
