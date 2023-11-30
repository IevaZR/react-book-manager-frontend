import React from "react";
import "./BooksCategorySection.css";
import Arrow from "./../../Assets/arrow.png";
import FictionalBooks from "./../../Assets/fictional-books.png";
import NonFictionalBooks from "./../../Assets/non-fictional-books.png";
import { Link } from "react-router-dom";

const BooksCategorySection = () => {
  return (
    <div className="BooksCategorySectionWrapper">
      <div className="BooksCategorySectionTopBooks">
        <div className="BooksCategorySectionTopBooksDescriptionWrapper">
          <h2>Top Fiction Books</h2>
          <p>
            Browse through our curated collection of top fiction books and get
            lost in captivating stories and imaginative worlds.
          </p>
          <button>
            <Link to="/books#FictionBooks">Read more 
            {/* <img src={Arrow} alt="arrow" /> */}
            </Link>
          </button>
        </div>
        <div className="BooksCategorySectionTopBooksImageWrapper">
          <img src={FictionalBooks} alt="fictional-books" />
        </div>
      </div>
      <div className="BooksCategorySectionTopBooks">
        <div className="BooksCategorySectionTopBooksImageWrapper">
          <img src={NonFictionalBooks} alt="non-fictional-books" />
        </div>
        <div className="BooksCategorySectionTopBooksDescriptionWrapper">
          <h2>Top Non-Fiction Books</h2>
          <p>
            Explore our handpicked selection of top non-fiction books that cover
            a wide range of topics and provide valuable knowledge and insights.
          </p>
          <button>
            <Link to="/books#NonFictionBooks">Read more 
            {/* <img src={Arrow} alt="arrow" /> */}
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooksCategorySection;
