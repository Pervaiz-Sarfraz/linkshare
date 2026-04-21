import React, { useState, useEffect } from "react";
import { navLinks } from "../constants/index";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { logo1 } from "../assets/Logo/index";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ onToggleTheme, currentTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isDark = currentTheme === "dark";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <header>
      <motion.nav
        className="header"
        animate={{ 
          backdropFilter: scrolled ? "blur(32px)" : "blur(16px)",
          background: scrolled ? "var(--glass-bg)" : "transparent"
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src={logo1} alt="LinkShare" style={{ height: '40px', borderRadius: 'var(--radius-sm)' }} />
            <span className="logo-text">LinkShare</span>
          </Link>
        </motion.div>

        <ul className="nav-links">
          {navLinks.map((li, i) => (
            <motion.li
              key={li.label}
              className="nav-item"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Link to={li.href}>{li.label}</Link>
            </motion.li>
          ))}
          <motion.li
            className="nav-item logout-item"
            onClick={() => { localStorage.clear(); window.location.reload(); }}
          >
            <a href="/">Logout</a>
          </motion.li>

          <div className="theme-icon" onClick={onToggleTheme}>
            {isDark ? <MdLightMode fontSize="1.2rem" /> : <MdDarkMode fontSize="1.2rem" />}
          </div>
        </ul>

        <div style={{ display: "none", alignItems: "center", gap: "1rem" }} className="mobile-controls">
           <div className="theme-icon" onClick={onToggleTheme} style={{ width: '36px', height: '36px' }}>
            {isDark ? <MdLightMode /> : <MdDarkMode />}
          </div>
          <motion.div
            className="hamburger-menu"
            onClick={() => setMobileOpen((p) => !p)}
            whileTap={{ scale: 0.9 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="hamburger-line"
                style={{ background: 'var(--text-primary)' }}
                animate={
                  mobileOpen
                    ? i === 0 ? { rotate: 45, y: 7 }
                    : i === 1 ? { opacity: 0 }
                    : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
              />
            ))}
          </motion.div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu"
            style={{
              listStyle: "none",
              background: "var(--bg-surface)",
              borderBottom: "1px solid var(--border)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              position: "absolute",
              width: "100%",
              zIndex: 999
            }}
          >
            {navLinks.map((li) => (
              <li key={li.label} className="nav-item">
                <Link to={li.href} onClick={() => setMobileOpen(false)}>{li.label}</Link>
              </li>
            ))}
            <li className="nav-item logout-item" onClick={() => localStorage.clear()}>
              <a href="/">Logout</a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;