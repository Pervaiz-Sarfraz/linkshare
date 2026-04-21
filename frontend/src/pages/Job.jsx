import React, { useEffect, useState } from 'react';
import { deleteJob, fetchJobs } from '../functionality/Api';
import JobCard from '../pages/JobDetail';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../comp/Loader';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

function Job() {
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs()
      .then((res) => { setJob(res.data); setLoading(false); })
      .catch((err) => { console.error("Error fetching jobs", err); setLoading(false); });
  }, []);

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJob((prev) => prev.filter((j) => j.job_id !== jobId));
    } catch (err) {
      console.error("Error deleting job", err);
    }
  };

  if (loading) return <Loader />;

  if (!job.length) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <div style={{ fontSize: '3rem', opacity: 0.4, marginBottom: '1rem' }}>💼</div>
        <h2 style={{ color: 'var(--text-muted)', fontFamily: 'Poppins', fontWeight: 600 }}>
          No jobs posted yet
        </h2>
        <p style={{ color: 'var(--text-faint)', marginTop: '0.5rem' }}>
          Be the first to post an opportunity!
        </p>
      </div>
    );
  }

  return (
    <div>
      <motion.p
        className="job-list-header"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        Showing <span>{job.length}</span> {job.length === 1 ? 'job' : 'jobs'}
      </motion.p>
      <motion.div
        className="job-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        <AnimatePresence mode="popLayout">
          {job.map((jobItem, index) => (
            <JobCard
              key={jobItem.job_id || `job-${index}`}
              job={jobItem}
              onDelete={handleDelete}
              isSaved={false}
              onToggleSave={() => {}}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Job;
