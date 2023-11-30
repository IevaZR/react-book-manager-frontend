import React, { useEffect } from "react";
import "./AboutBookPopup.css";
import AddToFavouritesBtn from "../../../AddToFavouritesBtn/AddToFavouritesBtn";
import RemoveFromFavouritesBtn from "../../../RemoveFromFavouritesBtn/RemoveFromFavouritesBtn";

const AboutBookPopup = ({
  book,
  bookCover,
  googleBookInfo,
  closePopup,
  updatedUserBooksList,
  bookInUserList,
}) => {
  const handlePopupClose = (event) => {
    const popupElement = document.querySelector(".AboutBookPopup");
    if (popupElement && !popupElement.contains(event.target)) {
      closePopup();
    }
  };

  const updateUserFavourites = (value) => {
    updatedUserBooksList(value);
  };

  useEffect(() => {
    document
      .querySelector(".AboutBookPopupWrapper")
      .addEventListener("click", handlePopupClose);
  }, []);

  return (
    <div className="AboutBookPopupWrapper">
      <div className="AboutBookPopup">
        <div className="AboutBookPopupImageWrapper">
          <img
            src={bookCover}
            alt="book-cover"
            className="AboutBookPopupImage"
          />
        </div>
        <div className="AboutBookPopupInfoWrapper">
          <div className="AboutBookPopupDetailsWrapper">
            <h3>{book.book_details[0].title}</h3>
            <p className="AboutBookPopupAuthor">
              by {book.book_details[0].author}
            </p>
            <p className="AboutBookPopupDescription">
              {book.book_details[0].description}
            </p>
            <br/>
            <a
              href={
                googleBookInfo
                  ? googleBookInfo.items[0].volumeInfo.canonicalVolumeLink
                  : ""
              }
              target="_blank"
              rel="noreferrer"
              className="AboutBookPopupLinkToGoogleBooks"
            >
              CLICK HERE for more info
            </a>
          </div>

          <div className="AboutBookPopupButtonWrapper">
            <button className="AboutBookPopupButton WhiteBtn">
              <a
                href={book.amazon_product_url}
                target="_blank"
                rel="noreferrer"
              >
                Buy on Amazon
              </a>
            </button>
            {!bookInUserList && (
              <AddToFavouritesBtn
                book={book}
                bookCover={bookCover}
                updatedUserBooksList={updateUserFavourites}
              />
            )}
            {bookInUserList && (
              <RemoveFromFavouritesBtn
                book={book}
                bookCover={bookCover}
                updatedUserBooksList={updateUserFavourites}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBookPopup;

//TODO user favourites need to be global variable
