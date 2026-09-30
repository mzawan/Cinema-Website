import React from 'react';
import "./Sidebar.css";

const translations = {
  en: {
    categories: 'Categories',
    language: 'Language',
    time: 'Time of Day',
    morning: 'Morning',
    evening: 'Evening',
    applyFilters: 'Apply Filters'
  }
};

function Sidebar({ setCategory, setTimeOfDay, setLanguage }) {
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTimeOfDay(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value); 
  };

  return (
    <div className="sidebar">
      <form>
        <div className="sidebar-groups">
          <h3 className="sg-title">{translations.en.categories}</h3>
          <input type="radio" id="adventure" name="category" value="Adventure" onChange={handleCategoryChange} />
          <label htmlFor="adventure">Adventure</label><br />
          <input type="radio" id="action" name="category" value="Action" onChange={handleCategoryChange} />
          <label htmlFor="action">Action</label><br />
          <input type="radio" id="comedy" name="category" value="Comedy" onChange={handleCategoryChange} />
          <label htmlFor="comedy">Comedy</label><br />
          <input type="radio" id="drama" name="category" value="Drama" onChange={handleCategoryChange} />
          <label htmlFor="drama">Drama</label><br />
          <input type="radio" id="thriller" name="category" value="Thriller" onChange={handleCategoryChange} />
          <label htmlFor="thriller">Thriller</label><br />
          <input type="radio" id="webseries" name="category" value="Web Series" onChange={handleCategoryChange} />
          <label htmlFor="webseries">Web Series</label><br />
          <input type="radio" id="sciencefiction" name="category" value="Science Fiction" onChange={handleCategoryChange} />
          <label htmlFor="sciencefiction">Science Fiction</label><br />
          <input type="radio" id="historical" name="category" value="Historical" onChange={handleCategoryChange} />
          <label htmlFor="historical">Historical</label><br />
          <input type="radio" id="crime" name="category" value="Crime" onChange={handleCategoryChange} />
          <label htmlFor="crime">Crime</label><br />
          <input type="radio" id="romantic" name="category" value="Romantic" onChange={handleCategoryChange} />
          <label htmlFor="romantic">Romantic</label><br />
        </div>

        <div className="sidebar-groups">
          <h3 className="sg-title">{translations.en.language}</h3>
          <input type="radio" id="english" name="language" value="en" onChange={handleLanguageChange} />
          <label htmlFor="english">English</label><br />
          <input type="radio" id="hindi" name="language" value="hi" onChange={handleLanguageChange} />
          <label htmlFor="hindi">Hindi</label><br />
          <input type="radio" id="spanish" name="language" value="es" onChange={handleLanguageChange} />
          <label htmlFor="spanish">Spanish</label><br />
        </div>

        <div className="sidebar-groups">
          <h3 className="sg-title">{translations.en.time}</h3>
          <input type="radio" id="morning" name="time" value="morning" onChange={handleTimeChange} />
          <label htmlFor="morning">{translations.en.morning}</label><br />
          <input type="radio" id="evening" name="time" value="evening" onChange={handleTimeChange} />
          <label htmlFor="evening">{translations.en.evening}</label><br />
        </div>

        <div className="sidebar-groups">
          <a href="#" className="btn-l btn">{translations.en.applyFilters}</a>
        </div>
      </form>
    </div>
  );
}

export default Sidebar;
