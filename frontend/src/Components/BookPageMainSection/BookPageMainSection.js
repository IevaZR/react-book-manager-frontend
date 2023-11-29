import React, { useEffect, useState } from "react";
import "./BookPageMainSection.css";
import BookItem from "../BookPageMainSection/BookItem/BookItem";
import FirstBookItem from "./BookItem/FirstBookItem";

const BookPageMainSection = () => {
  const [nytFictionBookData, setNytFictionBookData] = useState([]);
  const [nytNonFictionBookData, setNytNonFictionBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstFictionBook, setFirstFictionBook] = useState({});
  const [filteredFictionList, setFilteredFictionList] = useState([]);
  const [firstNonFictionBook, setFirstNonFictionBook] = useState({});
  const [filteredNonFictionList, setFilteredNonFictionList] = useState([]);

  useEffect(() => {
    fetchFictionBooks();
    fetchNonFictionBooks();
  }, []);

  const fetchFictionBooks = () => {
    const apiKey = process.env.REACT_APP_NYT_BOOKS_API_KEY;
    fetch(
      "https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=" +
        apiKey,
      { method: "get" }
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let data = json.results;
        setNytFictionBookData(data);
        let filteredBooks = data.filter((book) => book.rank === 1);
        setFirstFictionBook(filteredBooks[0]);
        setFilteredFictionList(data.filter((book) => book.rank !== 1));
        setIsLoading(false);
      });
  };

  const fetchNonFictionBooks = () => {
    const apiKey = process.env.REACT_APP_NYT_BOOKS_API_KEY;
    fetch(
      "https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-nonfiction&api-key=" +
        apiKey,
      { method: "get" }
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let data = json.results;
        setNytNonFictionBookData(data);
        let filteredBooks = data.filter((book) => book.rank === 1);
        setFirstNonFictionBook(filteredBooks[0]);
        setFilteredNonFictionList(data.filter((book) => book.rank !== 1));
        setIsLoading(false);
      });
  };

  return (
    <div className="BookPageMainSectionWrapper">
      <div className="BookPageStickyBackground">
        <div className="BookShelfWrapper" id="FictionBooks">
          <div className="BookShelfTop">
            <div className="BookShelfLeftInfoWrapper">
              <div className="BookShelfHeadingWrapper">
                <h1 className="BookShelfHeading">Top Fiction Books</h1>
                <p>
                  Delve into extraordinary narratives and imaginative realms
                  with our top-rated fiction books that promise thrilling
                  adventures and compelling storytelling.
                </p>
              </div>

              <a href="#NonFictionBooks">SHOW NON-FICTION BOOKS</a>
            </div>
            {isLoading ? (
              <p>Loading ...</p>
            ) : (
              <div className="FirstBookBigWrapper">
                {firstFictionBook &&
                Object.keys(firstFictionBook).length > 0 ? (
                  <FirstBookItem book={firstFictionBook} />
                ) : (
                  <p>No book available</p>
                )}
              </div>
            )}
          </div>
          <div className="BookShelf"></div>
          <div className="BookShelfFront"></div>

          <div className="BookShelfBottom">
            <div className="BookShelfShadow">
              <div className="BookShelfShadowObject"></div>
            </div>
            <div className="BookPageTopBooksWrapper">
              {isLoading ? (
                <p>Loading ...</p>
              ) : (
                filteredFictionList?.map((book, index) => (
                  <BookItem
                    key={book.book_details[0].primary_isbn10}
                    book={book}
                    index={index}
                    width="100px"
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <div className="BookShelfWrapper" id="NonFictionBooks">
          <div className="BookShelfTop">
            <div className="BookShelfLeftInfoWrapper">
              <div className="BookShelfHeadingWrapper">
                <h1 className="BookShelfHeading">Top Non-Fiction Books</h1>
                <p>
                  Explore the realm of reality with our collection of top
                  non-fiction books. Dive into captivating narratives,
                  insightful memoirs, and thought-provoking accounts that
                  enlighten and inform, offering a rich array of knowledge and
                  perspectives on various subjects
                </p>
              </div>
              <a href="#FictionBooks">SHOW FICTION BOOKS</a>
            </div>

            {isLoading ? (
              <p>Loading ...</p>
            ) : (
              <div className="FirstBookBigWrapper">
                {firstNonFictionBook &&
                Object.keys(firstNonFictionBook).length > 0 ? (
                  <FirstBookItem book={firstNonFictionBook} />
                ) : (
                  <p>No book available</p>
                )}
              </div>
            )}
          </div>
          <div className="BookShelf"></div>
          <div className="BookShelfFront"></div>

          <div className="BookShelfBottom">
            <div className="BookShelfShadow">
              <div className="BookShelfShadowObject"></div>
            </div>
            <div className="BookPageTopBooksWrapper">
              {isLoading ? (
                <p>Loading ...</p>
              ) : (
                filteredNonFictionList?.map((book, index) => (
                  <BookItem
                    key={book.book_details[0].primary_isbn10}
                    book={book}
                    index={index}
                    width="100px"
                  />
                ))
              )}
            </div>
          </div>
        </div>
        {/* {isPopupOpen && <AboutBookPopup />} */}
      </div>
    </div>
  );
};

export default BookPageMainSection;

//TODO Make book carousel
//TODO Add 'jump to non-fiction books' button
//TODO Add back to top button
//TODO Kā rīkties ar to, ka tiek sasniegts API calls limits?
//TODO Try plain Redux?
//TODO Login with Google or Facebook
