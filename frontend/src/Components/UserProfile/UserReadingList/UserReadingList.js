import React, { useEffect } from "react";
import "./UserReadingList.css";
import UserBookItem from "./UserBookItem/UserBookItem";
import { useSelector } from "react-redux";

const UserReadingList = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="UserReadingListWrapper">
      <h2 className="UserReadingListHeading">Books That I Want To Read</h2>

      {currentUser && currentUser.readingListBooks && (
        <div className="UserReadingList">
          {currentUser.readingListBooks.map((book) => (
            <UserBookItem key={book.title} book={book} />
          ))}
        </div>
      )}
      {currentUser && currentUser.readingListBooks.length === 0 && (
        <p className="NoBooksToShow">No books in My Reading List</p>
      )}
    </div>
  );
};

export default UserReadingList;
