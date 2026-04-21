import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiBriefcase, FiMapPin } from 'react-icons/fi';

const Search = ({ title, setTitle, company, setCompany, location, setLocation }) => {
  const handleSearch = (e) => { e.preventDefault(); };
  const clearSearch = () => { setTitle(""); setCompany(""); setLocation(""); };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="search">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.h1 className="search-headline" variants={itemVariants}>
          Find Your Dream Job
        </motion.h1>
        <motion.p className="search-sub" variants={itemVariants}>
          Explore thousands of opportunities from top companies worldwide
        </motion.p>

        <motion.div className="search-container" variants={itemVariants}>
          <form onSubmit={handleSearch}>
            <div className="search-form">
              <div className="search-input">
                <FiBriefcase className="icon" style={{ color: 'var(--brand)', flexShrink: 0 }} />
                <input
                  className="input-field"
                  placeholder="Job title, keywords..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="search-divider" />

              <div className="search-input">
                <FiSearch className="icon" style={{ color: 'var(--brand)', flexShrink: 0 }} />
                <input
                  className="input-field"
                  placeholder="Company name..."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="search-divider" />

              <div className="search-input">
                <FiMapPin className="icon" style={{ color: 'var(--brand-2)', flexShrink: 0 }} />
                <input
                  className="input-field"
                  placeholder="Location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <motion.button
                className="search-button"
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Search
              </motion.button>
            </div>
          </form>

          {(title || company || location) && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '0.75rem', textAlign: 'center' }}
            >
              <button className="clear-button" onClick={clearSearch}>
                ✕ Clear filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Search;
