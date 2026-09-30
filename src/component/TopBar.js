import React,{useState} from "react";
import "./TopBar.css";
import menuImg from './assets/menu.png';
import helpImg from './assets/help.png';
import profileImg from './assets/profile.jpg';
import notificationImg from './assets/notification.png';
import { useNavigate } from "react-router-dom";


function TopBar() {
    const [showNewPage, setShowNewPage] = useState(false); 
    const [showMoviesPage, setShowMoviesPage] = useState(false); 
    const [name, setName] = useState(""); 
    const [ticketCount, setTicketCount] = useState(1); 
    const [paymentMethod, setPaymentMethod] = useState(""); 
    const [accountNumber, setAccountNumber] = useState(""); 
    const [paypalEmail, setPaypalEmail] = useState(""); 
    const [isBooked, setIsBooked] = useState(false); 
    const [shownotification, setShownotification] = useState(false);
    const [showEvent, setShowEvent] = useState(false);
    const [showseriesPage, setShowseriesPage] = useState(false);
    const [showdramaPage, setShowdramaPage] = useState(false);
    const [showcartoonPage, setShowcartoonPage] = useState(false);
    const [showkidsPage, setShowkidsPage] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false); 
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [showHelpMessage, setShowHelpMessage] = useState(false); 
    const [istvshowVisible, setIstvshowVisible] = useState(false); 
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermseries, setSearchTermseries] = useState("");
    const [searchTermdrama, setSearchTermdrama] = useState("");
    const [searchTermkids, setSearchTermkids] = useState("");
    const [searchTermcartoon, setSearchTermcartoon] = useState("");


    const handleTicketClick = () => {
      setShowNewPage(true); 
      setShowMoviesPage(false); 
      setIsMenuVisible(false);
      setIsProfileVisible(false);
      setIstvshowVisible(false);
    };
  
    const handleMoviesClick = () => {
      setShowMoviesPage(true); 
      setShowNewPage(false); 
      setIsMenuVisible(false);
      setIsProfileVisible(false);
      setIstvshowVisible(false);
    };
    const handleseriesClick = () => {
      setShowseriesPage(true); 
      setShowNewPage(false); 
      setIsMenuVisible(false);
      setIsProfileVisible(false);
      setIstvshowVisible(false);
    };
    const handleBackClick = () => {
      setShowNewPage(false); 
      setShowMoviesPage(false); 
      setShowseriesPage(false);
      setShowdramaPage(false); 
      setShowcartoonPage(false);  
      setShowkidsPage(false); 
      setIsMenuVisible(false);
      setIstvshowVisible(false);
      setIsProfileVisible(false);
  };
  
    const handleBookingSubmit = (event) => {
      event.preventDefault();
      setIsBooked(true); 
    };
  
    const handlePaymentMethodChange = (e) => {
      setPaymentMethod(e.target.value);
    };
  
    const handleTicketCountChange = (e) => {
      setTicketCount(e.target.value); 
    };
    const handlenotificationClick = () => {
      setShownotification(true); 
      setIsMenuVisible(false);
      setIsProfileVisible(false);
      setIstvshowVisible(false);
    };
    const handleEventClick = () => {
      setShowEvent(true); 
      setIsMenuVisible(false);
      setIsProfileVisible(false);
      setIstvshowVisible(false);
    };
  
    const handleClosenotification = () => {
      setShownotification(false); 
      setShowEvent(false);
    };
  
    const handleHelpClick = () => {
      setShowHelpMessage(true); 
      setIsMenuVisible(false);
      setIsProfileVisible(false);
      setIstvshowVisible(false);
    };
  
    const handleCloseHelpMessage = () => {
      setShowHelpMessage(false); 
      setIsProfileVisible(false);
      setIsMenuVisible(false);
      setIstvshowVisible(false);
    };
    
    const toggleProfile = () => {
      setIsProfileVisible(!isProfileVisible);
      setIsMenuVisible(false); 
      setIstvshowVisible(false);
    };
  
    const toggleMenu = () => {
      setIsMenuVisible(!isMenuVisible); 
      setIsProfileVisible(false); 
      setIstvshowVisible(false);
    };
    
    const toggleTvshow = () => {
      setIstvshowVisible(!istvshowVisible); 
      setIsProfileVisible(false); 
      setIsMenuVisible(false); 
    };
  
    const handledramaClick = () => {
      setShowdramaPage(true); 
      setShowNewPage(false); 
      setIsMenuVisible(false);
      setIsProfileVisible(false);
      setIstvshowVisible(false);
    };
   
    const handlecartoonClick = () => {
      setShowcartoonPage(true); 
      setShowNewPage(false); 
      setIsMenuVisible(false);
      setIsProfileVisible(false);
      setIstvshowVisible(false);
    };
  
    const handlekidsClick = () => {
      setShowkidsPage(true); 
      setShowNewPage(false); 
      setIsMenuVisible(false);
      setIsProfileVisible(false);
      setIstvshowVisible(false);
    };
  
      const [movies] = useState([ 
          { title: "Animal", genre: "Action, Drama", date: "01-Dec-2024", day: "Monday", showtime: "10:00 AM", description: "A gripping story of a man's journey through revenge and redemption." },
          { title: "Black Adam", genre: "Action, Fantasy", date: "02-Dec-2024", day: "Tuesday", showtime: "1:00 PM", description: "The DC anti-hero's origin story filled with power and vengeance." },
          { title: "Ishq Murshad", genre: "Romance, Drama", date: "03-Dec-2024", day: "Wednesday", showtime: "4:00 PM", description: "A heartfelt tale of love, sacrifice, and dreams against odds." },
          { title: "Carry on Jatta 3", genre: "Comedy", date: "04-Dec-2024", day: "Thursday", showtime: "7:00 PM", description: "A laughter riot as characters navigate love, family, and misunderstandings." },
          { title: "Avengers: Endgame", genre: "Action, Sci-Fi", date: "05-Dec-2024", day: "Friday", showtime: "10:00 PM", description: "The epic conclusion to the Infinity Saga with Earth's mightiest heroes." },
          { title: "Frozen 2", genre: "Animation, Adventure", date: "06-Dec-2024", day: "Saturday", showtime: "12:00 AM", description: "Join Elsa and Anna as they uncover secrets about their family's past." },
          { title: "Jawan", genre: "Thriller, Crime", date: "07-Dec-2024", day: "Sunday", showtime: "2:00 AM", description: "An action-packed journey of a vigilante fighting for justice." },
          { title: "Kantara", genre: "Mystery, Action", date: "02-Dec-2024", day: "Tuesday", showtime: "6:00 AM", description: "A tale steeped in tradition, folklore, and the clash of modernity." },
          { title: "Dune", genre: "Sci-Fi, Adventure", date: "03-Dec-2024", day: "Wednesday", showtime: "8:00 AM", description: "An epic sci-fi journey exploring a battle over the desert planet Arrakis." },
          { title: "Interstellar", genre: "Sci-Fi, Drama", date: "07-Dec-2024", day: "Sunday", showtime: "3:30 PM", description: "A breathtaking space odyssey exploring love, survival, and time." },
          { title: "The Notebook", genre: "Romance, Drama", date: "01-Dec-2024", day: "Monday", showtime: "5:00 PM", description: "A timeless romantic story of enduring love against all odds." },
          { title: "The Conjuring", genre: "Horror, Thriller", date: "03-Dec-2024", day: "Wednesday", showtime: "7:30 PM", description: "A terrifying tale of paranormal investigators tackling a haunted case." },
          { title: "La La Land", genre: "Romance, Musical", date: "07-Dec-2024", day: "Sunday", showtime: "12:00 AM", description: "An enchanting story of dreams, love, and music in Los Angeles." },
          { title: "3 Idiots", genre: "Comedy, Drama", date: "06-Dec-2024", day: "Saturday", showtime: "1:30 AM", description: "A hilarious and heartwarming journey of three friends in college." },
          { title: "Inception", genre: "Sci-Fi, Thriller", date: "07-Dec-2024", day: "Sunday", showtime: "3:00 AM", description: "A mind-bending story about dreams within dreams and corporate espionage." },
        ]);
  
        const filteredMovies = movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
        );
  
      const [series] = useState([ 
          { title: "Money Heist", genre: "Crime, Thriller", date: "04-Dec-2024", day: "Thursday", showtime: "11:00 AM", description: "A group of robbers executes a brilliant heist under the guidance of 'The Professor'." },
          { title: "Friends", genre: "Comedy", date: "05-Dec-2024", day: "Friday", showtime: "1:00 PM", description: "The classic sitcom about six friends navigating life and relationships." },
          { title: "Stranger Things", genre: "Sci-Fi, Thriller", date: "06-Dec-2024", day: "Saturday", showtime: "9:00 PM", description: "A thrilling battle between good and evil in the mysterious 'Upside Down'." },
          { title: "Breaking Bad", genre: "Drama, Crime", date: "07-Dec-2024", day: "Sunday", showtime: "10:30 PM", description: "The gripping story of a chemistry teacher turned drug kingpin." },
          { title: "The Crown", genre: "Historical, Drama", date: "08-Dec-2024", day: "Monday", showtime: "2:00 PM", description: "A dramatized account of Queen Elizabeth II's reign and the British royal family." },
          { title: "The Witcher", genre: "Fantasy, Action", date: "09-Dec-2024", day: "Tuesday", showtime: "4:00 PM", description: "The journey of Geralt of Rivia, a monster hunter navigating a turbulent world." },
          { title: "The Mandalorian", genre: "Sci-Fi, Adventure", date: "10-Dec-2024", day: "Wednesday", showtime: "6:00 PM", description: "The adventures of a bounty hunter in the Star Wars universe." },
          { title: "Squid Game", genre: "Thriller, Drama", date: "11-Dec-2024", day: "Thursday", showtime: "8:00 PM", description: "Contestants risk their lives in a deadly game to win a fortune." },
          { title: "House of the Dragon", genre: "Fantasy, Drama", date: "12-Dec-2024", day: "Friday", showtime: "10:00 PM", description: "The story of House Targaryen set hundreds of years before Game of Thrones." },
          { title: "The Boys", genre: "Action, Dark Comedy", date: "13-Dec-2024", day: "Saturday", showtime: "12:00 PM", description: "A gritty take on superheroes and the dark truths behind their power." },
          { title: "Peaky Blinders", genre: "Drama, Crime", date: "14-Dec-2024", day: "Sunday", showtime: "3:00 PM", description: "The rise of the Shelby crime family in early 20th-century England." },
          { title: "Loki", genre: "Fantasy, Adventure", date: "15-Dec-2024", day: "Monday", showtime: "5:00 PM", description: "The God of Mischief embarks on a timeline-bending journey." },
          { title: "Dark", genre: "Sci-Fi, Mystery", date: "16-Dec-2024", day: "Tuesday", showtime: "7:00 PM", description: "A mind-bending saga of time travel, family secrets, and fate." },
          { title: "The Office", genre: "Comedy", date: "17-Dec-2024", day: "Wednesday", showtime: "9:00 PM", description: "A hilarious look at the daily lives of office employees in Scranton, PA." },
        ]);
        
      const filteredseries =series.filter(
          (series) =>
              series.title.toLowerCase().includes(searchTermseries.toLowerCase()) ||
              series.genre.toLowerCase().includes(searchTermseries.toLowerCase())
          );
  
      const [drama] = useState([ 
          { title: "Humsafar", genre: "Romance, Drama", date: "01-Dec-2024", day: "Monday", showtime: "10:00 PM", description: "A beautiful love story about a couple facing obstacles in their relationship." },
          { title: "Zindagi Gulzar Hai", genre: "Romance, Drama", date: "02-Dec-2024", day: "Tuesday", showtime: "11:00 PM", description: "A tale of love, class divide, and the journey of self-discovery." },
          { title: "Meri Zaat Zarra-e-Benishan", genre: "Drama, Mystery", date: "03-Dec-2024", day: "Wednesday", showtime: "9:00 PM", description: "A gripping story of betrayal, revenge, and the pursuit of truth." },
          { title: "Alif", genre: "Drama, Spiritual", date: "04-Dec-2024", day: "Thursday", showtime: "8:00 PM", description: "A profound tale about love, spirituality, and the search for one's true calling." },
          { title: "Dastaan", genre: "Drama, War", date: "05-Dec-2024", day: "Friday", showtime: "10:00 PM", description: "A heartbreaking story set against the backdrop of partition in India and Pakistan." },
          { title: "Khaani", genre: "Drama, Thriller", date: "06-Dec-2024", day: "Saturday", showtime: "9:00 PM", description: "A story of love and revenge with deep social and emotional elements." },
          { title: "Dil Ruba", genre: "Romance, Drama", date: "07-Dec-2024", day: "Sunday", showtime: "10:30 PM", description: "A romantic drama that explores love, guilt, and emotional conflict." }
        ]);
  
      const filtereddrama =drama.filter(
          (drama) =>
              drama.title.toLowerCase().includes(searchTermdrama.toLowerCase()) ||
             drama.genre.toLowerCase().includes(searchTermdrama.toLowerCase())
          );
  
      const [cartoon] = useState([ 
         { title: "Tom and Jerry", genre: "Animation, Comedy", date: "01-Dec-2024", day: "Monday", showtime: "12:00 PM", description: "The timeless rivalry between a cat and mouse that leads to endless comedy." },
         { title: "SpongeBob SquarePants", genre: "Animation, Comedy", date: "02-Dec-2024", day: "Tuesday", showtime: "3:00 PM", description: "The fun and wacky adventures of SpongeBob and his friends in Bikini Bottom." },
         { title: "The Lion King", genre: "Animation, Adventure", date: "03-Dec-2024", day: "Wednesday", showtime: "2:00 PM", description: "A young lion prince overcomes hardship and learns the true meaning of leadership." },
         { title: "Frozen", genre: "Animation, Adventure", date: "04-Dec-2024", day: "Thursday", showtime: "4:00 PM", description: "Two sisters uncover the magical secrets of their kingdom in a heartwarming tale." },
         { title: "Puss in Boots", genre: "Animation, Adventure", date: "05-Dec-2024", day: "Friday", showtime: "6:00 PM", description: "A fearless and charming cat embarks on a swashbuckling adventure to save the world." },
         { title: "Shrek", genre: "Animation, Comedy", date: "06-Dec-2024", day: "Saturday", showtime: "7:00 PM", description: "An ogre embarks on an adventure to rescue a princess and learns about friendship and love." },
         { title: "Finding Nemo", genre: "Animation, Adventure", date: "07-Dec-2024", day: "Sunday", showtime: "12:30 PM", description: "A clownfish travels across the ocean to find his son, encountering colorful characters." }
        ]);
  
      const filteredcartoon =cartoon.filter(
          (cartoon) =>
              cartoon.title.toLowerCase().includes(searchTermcartoon.toLowerCase()) ||
          cartoon.genre.toLowerCase().includes(searchTermcartoon.toLowerCase())
          );
  
      const [kids] = useState([ 
          { title: "Peppa Pig", genre: "Animation, Kids", date: "01-Dec-2024", day: "Monday", showtime: "8:00 AM", description: "Join Peppa and her family as they embark on fun adventures." },
          { title: "Paw Patrol", genre: "Animation, Kids", date: "02-Dec-2024", day: "Tuesday", showtime: "10:00 AM", description: "The heroic pups work together to protect Adventure Bay." },
          { title: "Bluey", genre: "Animation, Kids", date: "03-Dec-2024", day: "Wednesday", showtime: "11:00 AM", description: "A fun, adventurous show about a lovable dog family." },
          { title: "Mickey Mouse Clubhouse", genre: "Animation, Kids", date: "04-Dec-2024", day: "Thursday", showtime: "9:30 AM", description: "Mickey and friends solve problems using teamwork and fun tools." },
          { title: "Dora the Explorer", genre: "Animation, Kids", date: "05-Dec-2024", day: "Friday", showtime: "10:30 AM", description: "Dora embarks on adventures with her monkey Boots, solving puzzles along the way." },
          { title: "Cocomelon", genre: "Animation, Kids", date: "06-Dec-2024", day: "Saturday", showtime: "12:00 PM", description: "A musical journey of learning and fun for toddlers." },
          { title: "Octonauts", genre: "Animation, Kids", date: "07-Dec-2024", day: "Sunday", showtime: "8:00 AM", description: "The Octonauts explore the oceans, helping creatures in need." }
        ]); 
  
      const filteredkids =kids.filter(
          (Kids) =>
              Kids.title.toLowerCase().includes(searchTermkids.toLowerCase()) ||
          Kids.genre.toLowerCase().includes(searchTermkids.toLowerCase())
          );
  
    return (
      <div>
        {showNewPage ? (
          <section className="ticket-page">
            <div className="left-content">
              <h2 className="title">Cinemix - Tickets</h2>
              <ul className="navigation">
                <li>
                  <a href="#" onClick={handleBackClick}>Back</a>
                </li>
              </ul>
            </div>
            <div className="content">
              {isBooked ? (
                <div className="booking-confirmation">
                  <h1>Booking Confirmed!</h1>
                  <p>Thank you, {name}. Your tickets have been successfully booked.</p>
                  <p>Number of Tickets: {ticketCount}</p>
                  <p>Payment Method: {paymentMethod}</p>
                </div>
              ) : (
                <div className="booking-form">
                  <h1>Ticket Booking</h1>
                  <form onSubmit={handleBookingSubmit}>
                    <label htmlFor="name">Your Name:</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
  
                    <label htmlFor="ticket-count">Number of Tickets:</label>
                    <input
                      type="number"
                      id="ticket-count"
                      value={ticketCount}
                      onChange={handleTicketCountChange}
                      min="1"
                      required
                    />
  
                    <label htmlFor="payment-method">Select Payment Method:</label>
                    <select
                      id="payment-method"
                      value={paymentMethod}
                      onChange={handlePaymentMethodChange}
                      required
                    >
                      <option value="">--Choose Payment Method--</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="PayPal">PayPal</option>
                    </select>
  
                    {(paymentMethod === 'Debit Card' || paymentMethod === 'Credit Card') && (
                      <div>
                        <label htmlFor="account-number">Enter Card Number:</label>
                        <input
                          type="text"
                          id="account-number"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                    )}
  
                    {paymentMethod === 'PayPal' && (
                      <div>
                        <label htmlFor="paypal-email">Enter PayPal Email:</label>
                        <input
                          type="email"
                          id="paypal-email"
                          value={paypalEmail}
                          onChange={(e) => setPaypalEmail(e.target.value)}
                          placeholder="youremail@paypal.com"
                          required
                        />
                      </div>
                    )}
  
                    <button type="submit">Confirm Booking</button>
                  </form>
                </div>
              )}
            </div>
          </section>
        ) : showMoviesPage ? (
        <section className="movies-page">
        <div className="left-content">
          <h2 className="title">Cinemix - Movie Schedule</h2>
          <ul className="navigation">
            <li>
              <a href="#" onClick={handleBackClick}>Back</a>
            </li>
          </ul>
        </div>
        <div className="content">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for movies or genres..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <h3>Available Movies</h3>
          <ul className="movie-list">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie, index) => (
                <li key={index}>
                  <h4>{movie.title}</h4>
                  <p><strong>Date:</strong>{movie.date}</p>
                  <p><strong>Day:</strong>{movie.day}</p>
                  <p><strong>Showtime:</strong> {movie.showtime}</p>
                  <p><em>Genre:</em> {movie.genre}</p>
                  <p>{movie.description}</p>
                  <button
                    className="buy-ticket-button"
                    onClick={handleTicketClick}> Buy Ticket</button>
                </li>
              ))
            ) : (
              <p>No movies found for your search.</p>
            )}
          </ul>
        </div>
        </section>
        ):
        showseriesPage ? (
          <section className="series-page">
          <div className="left-content">
            <h2 className="title">Cinemix - Web Series Schedule</h2>
            <ul className="navigation">
              <li>
                <a href="#" onClick={handleBackClick}>Back</a>
              </li>
            </ul>
          </div>
          <div className="content">
            <input
              type="text"
              className="search-bar"
              placeholder="Search for web series or genres..."
              value={searchTermseries}
              onChange={(e) => setSearchTermseries(e.target.value)}
            />
            <h3>Available Web Series</h3>
            <ul className="series-list">
              {filteredseries.length > 0 ? (
                filteredseries.map((series, index) => (
                  <li key={index}>
                    <h4>{series.title}</h4>
                    <p><strong>Date:</strong>{series.date}</p>
                    <p><strong>Day:</strong>{series.day}</p>
                    <p><strong>Showtime:</strong> {series.showtime}</p>
                    <p><em>Genre:</em> {series.genre}</p>
                    <p>{series.description}</p>
                    <button
                      className="buy-ticket-button"
                      onClick={handleTicketClick}> Buy Ticket</button>
                  </li>
                ))
              ) : (
                <p>No series found for your search.</p>
              )}
            </ul>
          </div>
        </section>
        ):
   showdramaPage ? (
      <section className="drama-page">
      <div className="left-content">
        <h2 className="title">Cinemix - Drama Schedule</h2>
        <ul className="navigation">
          <li>
            <a href="#" onClick={handleBackClick}>Back</a>
          </li>
        </ul>
      </div>
      <div className="content">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for drama or genres..."
          value={searchTermdrama}
          onChange={(e) => setSearchTermdrama(e.target.value)}
        />
        <h3>Available Drama</h3>
        <ul className="drama-list">
          {filtereddrama.length > 0 ? (
            filtereddrama.map((drama, index) => (
              <li key={index}>
                <h4>{drama.title}</h4>
                <p><strong>Date:</strong>{drama.date}</p>
                <p><strong>Day:</strong>{drama.day}</p>
                <p><strong>Showtime:</strong> {drama.showtime}</p>
                <p><em>Genre:</em> {drama.genre}</p>
                <p>{drama.description}</p>
                <button
                  className="buy-ticket-button"
                  onClick={handleTicketClick}> Buy Ticket</button>
              </li>
            ))
          ) : (
            <p>No drama found for your search.</p>
          )}
        </ul>
      </div>
    </section>
      ):
      showcartoonPage ? (
         <section className="cartoon-page">
         <div className="left-content">
           <h2 className="title">Cinemix - Cartoon Schedule</h2>
           <ul className="navigation">
             <li>
               <a href="#" onClick={handleBackClick}>Back</a>
             </li>
           </ul>
         </div>
         <div className="content">
           <input
             type="text"
             className="search-bar"
             placeholder="Search for cartoon or genres..."
             value={searchTermcartoon}
             onChange={(e) => setSearchTermcartoon(e.target.value)}
           />
           <h3>Available Drama</h3>
           <ul className="cartoon-list">
             {filteredcartoon.length > 0 ? (
               filteredcartoon.map((cartoon, index) => (
                 <li key={index}>
                   <h4>{cartoon.title}</h4>
                   <p><strong>Date:</strong>{cartoon.date}</p>
                   <p><strong>Day:</strong>{cartoon.day}</p>
                   <p><strong>Showtime:</strong> {cartoon.showtime}</p>
                   <p><em>Genre:</em> {cartoon.genre}</p>
                   <p>{cartoon.description}</p>
                   <button
                     className="buy-ticket-button"
                     onClick={handleTicketClick}> Buy Ticket</button>
                 </li>
               ))
             ) : (
               <p>No cartoon found for your search.</p>
             )}
           </ul>
         </div>
       </section>
          ):
          showkidsPage ? (
            <section className="kids-page">
            <div className="left-content">
              <h2 className="title">Cinemix - kids Schedule</h2>
              <ul className="navigation">
                <li>
                  <a href="#" onClick={handleBackClick}>Back</a>
                </li>
              </ul>
            </div>
            <div className="content">
              <input
                type="text"
                className="search-bar"
                placeholder="Search for kids or genres..."
                value={searchTermkids}
                onChange={(e) => setSearchTermkids(e.target.value)}
              />
              <h3>Available Kids</h3>
              <ul className="kids-list">
                {filteredkids.length > 0 ? (
                  filteredkids.map((kids, index) => (
                    <li key={index}>
                      <h4>{kids.title}</h4>
                      <p><strong>Date:</strong>{kids.date}</p>
                      <p><strong>Day:</strong>{kids.day}</p>
                      <p><strong>Showtime:</strong> {kids.showtime}</p>
                      <p><em>Genre:</em> {kids.genre}</p>
                      <p>{kids.description}</p>
                      <button
                        className="buy-ticket-button"
                        onClick={handleTicketClick}> Buy Ticket</button>
                    </li>
                  ))
                ) : (
                  <p>No kids content found for your search.</p>
                )}
              </ul>
            </div>
          </section>
        ) : (
          <section className="top-bar">
            <div className="left-content">
              <h2 className="title">Cinemix</h2>
              <ul className="navigation">
                <li><a href="#" className='active'>Home</a></li>
                <li><a href="#" onClick={handleTicketClick}>Ticket</a></li>
                <li><a href="#" onClick={handleMoviesClick}>Movies</a></li>
                <li><a href="#" onClick={handleseriesClick}>Series</a></li>
                <li><a href="#" onClick={toggleTvshow}>TV Show</a></li>
              </ul>
            </div>
            <div className="right-content">
             <img src={notificationImg} alt="notification" className="notification"onClick={handlenotificationClick}/> 
              <img src={helpImg} alt="Help" className="help" onClick={handleHelpClick}/>
              <div className="profile-img-box">
                <img src={profileImg} alt="Profile" onClick={toggleProfile} />
              </div>
              <img src={menuImg} alt="Menu" className="menu"onClick={toggleMenu} />
            </div>
          </section>
        )}
          {/* Event Modal */}
          {showEvent && (
          <div className="event-modal">
            <div className="event-content">
              <h2>Important Event</h2>
              <ul>
              <li>
              Special Event<p> Free Kids Movie Screening on 10th December! Join us for fun!</p>
              </li>
              </ul>
              <button onClick={handleClosenotification}>Close</button>
            </div>
          </div>
        )}
         {/* Conditionally render the TV show */}
         {istvshowVisible && (
          <div className="tvshow-content">
                <div className="tvshow-header">
      <button className="back-button" onClick={handleBackClick}>
        <img
          src={require("./assets/back.png")}
          alt="Back"
          className="back-icon"
        />
      </button>
    </div>
            <ul>
              <li><a href="#"onClick={handleMoviesClick}>Movies</a></li>
              <li><a href="#"onClick={handledramaClick}>Dramas</a></li>
              <li><a href="#"onClick={handlecartoonClick}>Cartoon</a></li>
              <li><a href="#"onClick={handlekidsClick}>Kids</a></li>
              <li><a href="#" onClick={handleEventClick}>Event</a></li>
            </ul>
          </div>
        )}
{isMenuVisible && (
  <div className="menu-content">
    <div className="menu-header">
      <button className="back-button" onClick={handleBackClick}>
        <img
          src={require("./assets/back.png")}
          alt="Back"
          className="back-icon"
        />
      </button>
    </div>

    <ul className="menu-list">
      <li><a href="#" >Now Showing</a></li>
      <li><a href="#" >Upcoming Movies</a></li>
      <li><a href="#" onClick={handleTicketClick}>Book Tickets</a></li>
      <li><a href="#" >Cinemas</a></li>
      <li><a href="#" >Offers</a></li>
      <li><a href="#" >My Bookings</a></li>
      <li><a href="#" >Profile</a></li>
      <li><a href="#" >Support</a></li>
    </ul>

    <div className="menu-footer">
      <a href="#" >Logout</a>
    </div>
  </div>
)}




        {/* notification Modal */}
        {shownotification && (
          <div className="notification-modal">
            <div className="notification-content">
              <h2>Important Notification</h2>
              <p>
             Cinemix Pro is currently undergoing scheduled maintenance.
We’re working hard to improve your experience and will be back shortly.
Thank you for your patience and understanding!
              </p>
              <button onClick={handleClosenotification}>Close</button>
          </div>
          </div>
        )}
          {/* Help Message Section */}
          {showHelpMessage && (
          <div className="help-message">
            <div className='help-content'>
            <h2>Cinemix Help</h2>
            <p>
              How can we assist you? We are here to help with bookings, movie timings, and any other queries.
              Visit our <a href="#">Help Center</a> or <a href="#">Contact Support</a> for further assistance.
            </p>
            <button onClick={handleCloseHelpMessage}>Close</button>
          </div>
          </div>
        )}
          {isProfileVisible && (
        <div className="profile-dropdown">
           <div className="profile-header">
      <button className="back-button" onClick={handleBackClick}>
        <img
          src={require("./assets/back.png")}
          alt="Back"
          className="back-icon"
        />
      </button>
    </div>
          <ul>
            <li>View Profile</li>
            <li>Account Settings</li>
            <li>My Bookings</li>
            <li className="logout" onClick={() => console.log('Logging out...')}>Logout</li>
          </ul>
        </div>
      )}
               
      </div>
    );
  }
  export default TopBar;