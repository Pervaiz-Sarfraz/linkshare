import React from 'react'
 import "./Search.css";

const Search = ({ title, setTitle, company, setCompany, location, setLocation }) => {
  const handleSearch = (e) => {
    e.preventDefault();
   
  };

  const clearSearch = () => {
    setTitle("");
    setCompany("");
    setLocation("");
  };

  return (
    <section className="search">
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <div className="search-form">
            <div className="search-input">
              <input
                className="input-field"
                placeholder="Search Job..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="search-input">
              <input
                className="input-field"
                placeholder="Search Company..."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="search-input">
              <input
                className="input-field"
                placeholder="Search Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button className="search-button" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
        <button className="clear-button" onClick={clearSearch}>Clear All</button>
    </section>
  );
};


export default Search;
