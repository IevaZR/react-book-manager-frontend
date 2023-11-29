import React, { useState } from "react";
import "./BookRating.css"
import { FaStar } from "react-icons/fa";

const BookRating = ({saveRating, currentRating}) => {
  const [rating, setRating] = useState(currentRating);
  const [hover, setHover] = useState(null);

  const setNewRating = (ratingValue) => {
    setRating(ratingValue)
    saveRating(ratingValue)
  }

  return (
    <div className="BookRatingWrapper">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setNewRating(ratingValue)}
            />
            <FaStar
              size={15}
              className="starIcon"
              color={ratingValue <= (hover || rating) ? "#FFD700" : "grey"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default BookRating;
