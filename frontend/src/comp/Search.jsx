import React, { useEffect, useState } from "react";
import {
  AiOutlineSearch,
  AiFillCloseCircle,
  AiOutlineHome,
} from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { sortby, level, type } from "../constants/index";
import { fetchJobs } from "../functionality/Api";
import "./Search.css";

const Search = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
 const [jobs, setJobs] = useState([]);
 useEffect(() => {
  fetchJobs()
    .then((res) => {
      setJobs(res.data);
      setFilteredJobs(res.data); // show all by default
    })
    .catch((err) => console.error("Error fetching jobs", err));
}, []);


  const handleSearch = (e) => {
    e.preventDefault();

    const searchTitle = title.toLowerCase();
    const searchCompany = company.toLowerCase();
    const searchLocation = location.toLowerCase();
    
    const sortedJobs = [...jobs].sort((a, b) => {
      const aMatch =
        a.title.toLowerCase().includes(searchTitle) +
        a.company.toLowerCase().includes(searchCompany) +
        a.location.toLowerCase().includes(searchLocation);
    
      const bMatch =
        b.title.toLowerCase().includes(searchTitle) +
        b.company.toLowerCase().includes(searchCompany) +
        b.location.toLowerCase().includes(searchLocation);
    
      return bMatch - aMatch; 
    });
    
    setFilteredJobs(sortedJobs);
    
  };

  const clearSearch = () => {
    setTitle("");
    setCompany("");
    setLocation("");
    setFilteredJobs(jobs);
  };

  return (
    <section className="search">
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <div className="search-form">
            <div className="search-input">
              <AiOutlineSearch className="icon" />
              <input
                className="input-field"
                placeholder="Search Job..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {title && (
                <AiFillCloseCircle
                  className="close-icon"
                  onClick={() => setTitle("")}
                />
              )}
            </div>
            <div className="search-input">
              <AiOutlineHome className="icon" />
              <input
                className="input-field"
                placeholder="Search Company..."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              {company && (
                <AiFillCloseCircle
                  className="close-icon"
                  onClick={() => setCompany("")}
                />
              )}
            </div>
            <div className="search-input">
              <GoLocation className="icon" />
              <input
                className="input-field"
                placeholder="Search Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {location && (
                <AiFillCloseCircle
                  className="close-icon"
                  onClick={() => setLocation("")}
                />
              )}
            </div>
            <button className="search-button" type="submit">
              Search
            </button>
          </div>
        </form>

        <div className="filter-container">
          <div className="filter-group">
            <label htmlFor="relevance" className="filter-label">Sort By:</label>
            <select className="filter-select" id="relevance">
              {sortby.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="type" className="filter-label">Type:</label>
            <select className="filter-select" id="type">
              {type.map((item) => (
                <option key={item.id} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="level" className="filter-label">Level:</label>
            <select className="filter-select" id="level">
              {level.map((lvl) => (
                <option key={lvl.id} value={lvl.value}>
                  {lvl.value}
                </option>
              ))}
            </select>
          </div>
          <button className="clear-button" onClick={clearSearch}>Clear All</button>
        </div>
      </div>
    </section>
  );
};

export default Search;
