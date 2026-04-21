import React from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiMapPin, FiBriefcase, FiBookmark, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";

const JobDetail = ({ job, onDelete, isSaved, onToggleSave }) => {
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      onDelete(job.job_id);
    }
  };

  return (
    <motion.div
      className="job-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <div className="job-card-header" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div className="job-card-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 className="job-title" style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.3 }}>
            {job.title ?? job.job_title}
          </h3>
          <div className="icon-actions" style={{ display: 'flex', gap: '0.5rem' }}>
            <motion.button
              className="save-btn"
              onClick={() => onToggleSave(job.job_id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={isSaved ? "Unsave job" : "Save job"}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem',
                color: isSaved ? 'var(--brand)' : 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex'
              }}
            >
              {isSaved ? <FiStar style={{ fill: 'currentColor' }} /> : <FiBookmark />}
            </motion.button>
            <motion.button
              className="delete-btn"
              onClick={handleDelete}
              whileHover={{ scale: 1.1, color: 'var(--danger)' }}
              whileTap={{ scale: 0.9 }}
              title="Delete job"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex'
              }}
            >
              <FiTrash2 />
            </motion.button>
          </div>
        </div>

        <div className="job-company" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--brand)', fontSize: '0.9rem' }}>
          <FiBriefcase size="0.9rem" />
          <span>{job.company ?? job.job_company}</span>
        </div>

        <p className="job-description" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {job.description ?? job.job_description}
        </p>

        <div className="job-location" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <FiMapPin size="0.85rem" color="var(--brand-2)" />
          <span>{job.location ?? job.job_location}</span>
        </div>
      </div>

      <div className="job-card-footer" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
        <motion.button
          className="apply-button"
          onClick={() => navigate(`/jobs/${job.job_id}/apply`)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default JobDetail;
