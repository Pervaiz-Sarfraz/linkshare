import React from "react";
import { navLinks } from "../constants/index";
import { MdLightMode } from "react-icons/md";
import { logo1 } from "../assets/Logo/index";
import { Link } from "react-router-dom";
import "./Header.css"; 

const Header = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header>
      <nav className="header">
        <div className="logo">
           <Link to='/'> <img src={logo1} alt="Logo" className="logo"/></Link>
        </div>
        <ul className="nav-links">
          {navLinks.map((li) => (
            <li className="nav-item" key={li.label}>
              <a href={li.href}>{li.label}</a>
            </li>
          ))}
          <li className="nav-item" onClick={()=>{
            localStorage.clear();
          }}>
            <a href="/">Logout</a>
            </li>
          <MdLightMode onClick={toggleTheme} className="theme-icon" />
        </ul>
        <div className="theme-icon-mobile">
          <MdLightMode onClick={toggleTheme} />
        </div>
        <div className="hamburger-menu">
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;