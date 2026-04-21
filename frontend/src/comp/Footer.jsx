import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub,   href: "https://github.com/yourusername",         label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/yourprofile",      label: "LinkedIn" },
    { icon: FaTwitter,  href: "https://twitter.com/yourhandle",           label: "Twitter" },
    { icon: FaEnvelope, href: "mailto:contact@linkshare.com",             label: "Email" },
  ];

  const quickLinks = [
    { to: "/",             label: "Home" },
    { to: "/jobs",         label: "Browse Jobs" },
    { to: "/companies",    label: "Companies" },
    { to: "/applications", label: "My Applications" },
    { to: "/saved",        label: "Saved Jobs" },
  ];

  const resourceLinks = [
    { to: "/",       label: "Career Blog" },
    { to: "/",       label: "FAQ" },
    { to: "/",       label: "Privacy Policy" },
    { to: "/",       label: "Terms of Service" },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section">
          <h3>LinkShare</h3>
          <p style={{ maxWidth: '300px' }}>
            Elevating career networking for the modern professional. 
            Find your next opportunity or build your dream team with ease.
          </p>
          <div className="social-links" style={{ marginTop: '2rem' }}>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Platform</h4>
          <ul className="footer-links">
            {quickLinks.map(({ to, label }) => (
              <li key={label}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Section */}
        <div className="footer-section">
          <h4>Resources</h4>
          <ul className="footer-links">
            {resourceLinks.map(({ to, label }) => (
              <li key={label}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4>Get in Touch</h4>
          <p style={{ marginBottom: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            contact@linkshare.com
          </p>
          <p style={{ fontSize: '0.85rem' }}>
            Available Mon–Fri<br />
            9:00 AM – 6:00 PM PST
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} LinkShare Global Inc. Precision engineered for professionals. Built with ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;