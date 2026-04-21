import React from "react";
import { FiTrash2, FiMapPin, FiGlobe, FiBriefcase } from "react-icons/fi";
import { motion } from "framer-motion";

const CompanyDetail = ({ company, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this company?")) {
      onDelete(company.company_id);
    }
  };

  return (
    <motion.div
      className="job-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <div className="job-card-header" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="company-logo" style={{ 
              width: '56px', height: '56px', 
              background: 'var(--bg-elevated)', 
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden'
            }}>
              {company.companylogo ? (
                <img src={company.companylogo} alt={company.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <FiBriefcase size={24} color="var(--brand)" />
              )}
            </div>
            <div>
              <h3 className="job-title" style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{company.name}</h3>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    fontSize: '0.85rem', color: 'var(--brand)', fontWeight: 500
                  }}
                >
                  <FiGlobe size={14} />
                  <span>{company.website.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
            </div>
          </div>
          
          <motion.button
            className="delete-btn"
            onClick={handleDelete}
            whileHover={{ scale: 1.1, color: 'var(--danger)' }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.5rem',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <FiTrash2 size={18} />
          </motion.button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <FiMapPin size={16} color="var(--brand-2)" />
          <span>{company.location || "Global HQ"}</span>
        </div>

        <p className="job-description" style={{ 
          fontSize: '0.9rem', 
          color: 'var(--text-secondary)', 
          lineHeight: 1.6,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {company.description || "Leading the industry with innovation and a people-first approach."}
        </p>
      </div>

      <div className="job-card-footer" style={{ marginTop: 'auto', paddingTop: '1.25rem' }}>
        <motion.button
          className="apply-button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontWeight: 700,
            fontSize: '0.95rem'
          }}
        >
          View 12 Openings
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CompanyDetail;