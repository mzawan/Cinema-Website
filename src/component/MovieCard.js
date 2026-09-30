import React from "react";
import "./MovieCard.css";

function MovieCard({ movie = {}, translations = {}, language = "en" }) {
  const {imgSrc = "https://via.placeholder.com/150", title = "Untitled Movie",screen = "Unknown",price = "N/A",} = movie;
  
  const translation = translations[language] || {screen: "Screen",price: "Price",buyTickets: "Buy Tickets" };

  return (
    <div className="current-movie">
      <div className="cm-img-box"><img src={imgSrc} alt={title} /></div>
      <h3 className="movie-title">{title}</h3>
      <p className="screen-name">{translation.screen}: {screen}</p>
      <div className="booking">
        <h2 className="price">{translation.price}: {price}</h2>
        <a href="#">{translation.buyTickets}</a>
      </div>
    </div>
  );
}

export default MovieCard;
