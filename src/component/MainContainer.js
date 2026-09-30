import react from "react";
import "./MainContainer.css";
import UpcomingMovie from './UpcomingMovie';
import MovieCard from './MovieCard';
import movie1Img from './assets/movie1.jpg';
import movie2Img from './assets/movie2.jpg';
import movie3Img from './assets/movie3.jpg';
import movie4Img from './assets/movie4.jpg';
import movie5Img from './assets/movie5.jpg';
import movie6Img from './assets/movie6.jpg';

function MainContainer({ timeOfDay, category, language }) {
    const morningMovies = [
      { imgSrc: movie1Img, title: "Animal", screen: "Platinum", price: "$50" },
      { imgSrc: movie2Img, title: "Money Heist", screen: "Golden", price: "$25" },
      { imgSrc: movie3Img, title: "Black Adam", screen: "Silver", price: "$20" },
    ];
  
    const eveningMovies = [
      { imgSrc: movie4Img, title: "The Dark Knight", screen: "Platinum", price: "$40" },
      { imgSrc: movie5Img, title: "Inception", screen: "Golden", price: "$20" },
      { imgSrc: movie6Img, title: "The Maze Runner", screen: "Silver", price: "$10" },
    ];
  
    const moviesToDisplay = timeOfDay === "morning" ? morningMovies : eveningMovies;
  
    return (
      <div className="movies-container">
        <UpcomingMovie category={category} language={language} />
        <div className="current-movies">
          {moviesToDisplay.map((movie, index) => (
            <MovieCard key={index} movie={movie} language={language} />
          ))}
        </div>
      </div>
    );
  }

  export default MainContainer;