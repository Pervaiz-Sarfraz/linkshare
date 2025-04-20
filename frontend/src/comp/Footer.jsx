import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Linkshare</h3>
          <p>Find your dream job with our platform. Connecting talented professionals with top companies worldwide.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/jobs">Browse Jobs</a></li>
            <li><a href="/companies">Companies</a></li>
            <li><a href="/applications">My Applications</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Resources</h4>
          <ul className="footer-links">
            <li><a href="/blog">Career Blog</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="https://github.com/yourusername" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/yourprofile" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/yourhandle" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="mailto:contact@Linkshare.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
          <p className="contact-email">contact@Linkshare.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Linkshare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;