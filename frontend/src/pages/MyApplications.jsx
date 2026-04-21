import React, { useEffect, useState } from "react";
import { fetchApplication } from "../functionality/Api";
import { motion, AnimatePresence } from "framer-motion";
import { FiFileText, FiDownload, FiClock } from "react-icons/fi";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplication()
      .then((res) => { setApplications(res.data); setLoading(false); })
      .catch((err) => { console.error("Error fetching applications", err); setLoading(false); });
  }, []);

  if (loading) return <div className="loader-container" style={{ height: '60vh' }}><div className="loader" /></div>;

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <motion.div
        className="page-header"
        style={{ padding: '3rem 2rem 1rem', maxWidth: '1300px', margin: '0 auto' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ 
            width: '48px', height: '48px', 
            background: 'var(--brand-glow)', 
            borderRadius: 'var(--radius-md)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <FiFileText style={{ color: 'var(--brand)', fontSize: '1.5rem' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>My Applications</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.25rem' }}>
              You have {applications.length} active job {applications.length === 1 ? 'application' : 'applications'}
            </p>
          </div>
        </div>
      </motion.div>

      {applications.length === 0 ? (
        <motion.div
          className="no-jobs"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ padding: '6rem 2rem', textAlign: 'center' }}
        >
          <div className="no-jobs-icon" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📋</div>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>No applications yet</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
            Start your journey by applying to exciting opportunities that match your skills!
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="job-list"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          <AnimatePresence mode="popLayout">
            {applications.map((application, index) => (
              <motion.div
                key={application.application_id || `application-${index}`}
                className="job-card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                layout
              >
                <div className="job-card-header" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FiClock style={{ color: 'var(--brand)', fontSize: '0.9rem' }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        Applied {new Date(application.applied_at).toLocaleDateString()}
                      </span>
                    </div>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      background: 'var(--brand-glow)',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: '0.7rem',
                      color: 'var(--brand)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Under Review
                    </span>
                  </div>
                  
                  <h3 className="job-title" style={{ fontSize: '1.2rem' }}>Job ID #{application.job}</h3>
                </div>

                <div className="job-card-footer" style={{ marginTop: 'auto', paddingTop: '1.25rem' }}>
                  {application?.resume && (
                    <motion.a
                      href={application.resume}
                      download
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        width: '100%',
                        padding: '0.75rem',
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-strong)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-primary)',
                        fontWeight: 700,
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                      }}
                    >
                      <FiDownload />
                      <span>Download Resume</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default MyApplications;
