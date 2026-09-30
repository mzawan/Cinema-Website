import React from 'react';
import "./UpcomingMovie.css";

import adventureImg from '../assets/adventure-upcoming.jpg';
import actionImg from '../assets/action-upcoming.jpg';
import comedyImg from '../assets/comedy-upcoming.jpg';
import dramaImg from '../assets/drama-upcoming.jpg';
import crimeImg from '../assets/crime-upcoming.jpg';
import thrillerImg from '../assets/thriller-upcoming.jpg';
import historicalImg from '../assets/historical-upcoming.jpg';
import sciencefictionImg from '../assets/sciencefiction-upcoming.jpg';
import romanticImg from '../assets/romantic-upcoming.jpg';
import webseriesImg from '../assets/webseries-upcoming.jpg';
import upcomingImg from '../assets/upcoming3.webp';

const translations = {
  en: {
    upcomingMovie: 'Upcoming Movie',
    bookNow: 'Book Now',
    playTrailer: 'Play Trailer',
  },
  hi: {
    upcomingMovie: 'आगामी फिल्म',
    bookNow: 'अब बुक करें',
    playTrailer: 'ट्रेलर देखें',
  },
  es: {
    upcomingMovie: 'Próxima Película',
    bookNow: 'Reservar Ahora',
    playTrailer: 'Ver Tráiler',
  }
};

function UpcomingMovie({ category, language }) {
  const categoryImages = {
    Adventure: adventureImg,
    Action: actionImg,
    Comedy: comedyImg,
    Drama: dramaImg,
    Crime: crimeImg,
    Thriller: thrillerImg,
    Historical: historicalImg,
    'Science Fiction': sciencefictionImg,
    Romantic: romanticImg,
    'Web Series': webseriesImg,
  };

  const upcomingImage = categoryImages[category] || upcomingImg;
  const translatedUpcomingMovie = translations[language]?.upcomingMovie || translations.en.upcomingMovie;

  return (
    <div className="upcoming-img-box">
      <img src={upcomingImage} alt="Upcoming Movie" />
      <p className="upcoming-title">
        {category ? `${category} ${translatedUpcomingMovie}` : translatedUpcomingMovie}
      </p>
      <div className="buttons">
        <a href="#" className="btn">{translations[language]?.bookNow || translations.en.bookNow}</a>
        <a href="#" className="btn-alt btn">{translations[language]?.playTrailer || translations.en.playTrailer}</a>
      </div>
    </div>
  );
}

export default UpcomingMovie;
