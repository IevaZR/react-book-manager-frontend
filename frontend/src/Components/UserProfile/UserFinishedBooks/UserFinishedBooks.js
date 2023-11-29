import React, { useEffect } from "react";
import "./UserFinishedBooks.css";
import UserFinishedBookItem from "./UserFinishedBookItem/UserFinishedBookItem";
import { useSelector } from "react-redux";

const UserFinishedBooks = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="UserFinishedBooksWrapper">
      <h2 className="UserFinishedListHeading">
        Books That I Have Finished Reading
      </h2>

      {currentUser && currentUser.finishedBooks && (
        <div className="UserFinishedList">
          {currentUser.finishedBooks.map((book) => (
            <UserFinishedBookItem key={book.title} book={book} />
          ))}
        </div>
      )}
      {currentUser && currentUser.finishedBooks.length === 0 && (
        <p className="NoBooksToShow">No books in My Finished Books List</p>
      )}
    </div>
  );
};

export default UserFinishedBooks;
