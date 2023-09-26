import React from "react";
import "./SearchResult.css";
import { BASE_URL } from "../../App";


const SearchResult = ({ data }) => {
  return (
    <section className="FoodCardContainer">
        <div className="FoodCards">
          {data?.map(({ name, image, text, price }) => (
            <div className="FoodCard" key={name}>
              <div className="food_image">
                <img src={BASE_URL + image} alt="Food" />
              </div>
              <div className="food_info">
                <div className="info">
                  <h3>{name}</h3>
                  <p>{text}</p>
                </div>
                <button>${price.toFixed(2)}</button>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
};

export default SearchResult;
