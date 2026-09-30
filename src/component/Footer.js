import React, { useState } from "react";
import "./Footer.css";

function Footer() {
  const [showOffers, setShowOffers] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", comment: "" });

  const branches = [
    { name: "Gujrat", address: "Main G.T Road, Gujrat" },
    { name: "Gujranwalla", address: "Master City Gujranwalla, Gujranwalla" },
    { name: "Lahore", address: "Lahore Ring Road, Lahore" },
    { name: "Islamabad", address: "Inter State Bus Terminal Sector 43, Islamabad" },
    { name: "Karachi", address: "Mangla Road G-9 Markaz, Karachi" },
    { name: "Faisalabad", address: "Jhang Road Faisalabad Airport, Faisalabad" },
  ];
  
  const offers = [
    { time: "Morning Offer", details: "Get 20% off on all morning shows!" },
    { time: "Midnight Offer", details: "Enjoy midnight shows with 30% discount." },
    { time: "Weekend Offer", details: "Special combo offers available on weekends." },
  ];

  const [reviews, setReviews] = useState([
    { name: "Moiz Ahmad", comment: "Loved the movie experience! Highly recommended." },
    { name: "Sami Ullah", comment: "The seats were comfortable, and the service was excellent." },
    { name: "Seeman Ali", comment: "Great sound quality and visuals. Will visit again!" },
  ]);

  const handleAddReview = () => {
    if (newReview.name.trim() && newReview.comment.trim()) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: "", comment: "" });
      setShowAddReview(false);
    } else {
      alert("Please fill out both fields.");
    }
  };

  const handleOffersClick = (event) => {
    event.preventDefault();
    setShowOffers(!showOffers);
    setShowReviews(false);
    setShowBranches(false);
  };

  const handleReviewsClick = (event) => {
    event.preventDefault();
    setShowReviews(!showReviews);
    setShowOffers(false);
    setShowBranches(false);
  };

  const handleBranchesClick = (event) => {
    event.preventDefault();
    setShowBranches(!showBranches);
    setShowOffers(false);
    setShowReviews(false);
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>
              Cinemix is your ultimate destination for movie bookings, trailers, and
              showtimes. Experience the magic of cinema with us!
            </p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul><li><a href="#">Home</a></li>
              <li><a href="#" onClick={handleBranchesClick}>Branches</a></li>
              <li><a href="#" onClick={handleOffersClick}>Offers</a></li>
              <li><a href="#" onClick={handleReviewsClick}>Reviews</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Cinepax Pro. All Rights Reserved.</p>
        </div>
      </footer>

      {showOffers && (
        <div className="offers-section">
          <h2>Available Offers</h2>
          <ul>
            {offers.map((offer, index) => (
              <li key={index}>
                <h3>{offer.time}</h3>
                <p>{offer.details}</p>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowOffers(false)}>Close Offers</button>
        </div>
      )}

      {showReviews && (
        <div className="reviews-section">
          <h2>Customer Reviews</h2>
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <h3>{review.name}</h3>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
          {!showAddReview && <button onClick={() => setShowAddReview(true)}>Add Review</button>}
          {showAddReview && (
            <div className="add-review-form">
              <h3>Add Your Review</h3>
              <input
                type="text"
                placeholder="Your Name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}/>
              <textarea
                placeholder="Your Comment" 
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}>
                </textarea>
              <button onClick={handleAddReview}>Submit Review</button>
              <button onClick={() => setShowAddReview(false)}>Cancel</button>
            </div>
          )}
          <button onClick={() => setShowReviews(false)}>Close Reviews</button>
        </div>
      )}

      {showBranches && (
        <div className="branches-section">
          <h2>Our Branches</h2>
          <ul>
            {branches.map((branch, index) => (
              <li key={index}>
                <h3>{branch.name}</h3>
                <p>{branch.address}</p>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowBranches(false)}>Close Branches</button>
        </div>
      )}
    </>
  );
}

export default Footer;
