import React, { useEffect, useState } from 'react';
import { deleteJob, getSaveJobs, unSaveJob } from "../functionality/Api";
import JobCard from './JobDetail';
import { useMessage } from '../context/MessageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookmark } from 'react-icons/fi';

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setMessage } = useMessage();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const savedRes = await getSaveJobs();
        setSavedJobs(savedRes.data);
      } catch (err) {
        console.error("Failed to fetch saved jobs", err);
        setMessage("Failed to load saved jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      setSavedJobs(prev => prev.filter(job => job.job_id !== jobId));
      setMessage("Job deleted successfully");
    } catch (err) {
      console.error("Error deleting job", err);
      setMessage("Failed to delete job");
    }
  };

  const handleToggleSave = async (jobId) => {
    try {
      const savedJob = savedJobs.find(job => job.job_id === jobId);
      if (savedJob) {
        await unSaveJob(savedJob.id);
        setSavedJobs(prev => prev.filter(job => job.job_id !== jobId));
        setMessage("Job removed from saved list");
      }
    } catch (err) {
      console.error("Error unsaving job", err);
      setMessage("Failed to update saved status");
    }
  };

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
            <FiBookmark style={{ color: 'var(--brand)', fontSize: '1.5rem' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Saved Jobs</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.25rem' }}>
              {savedJobs.length > 0
                ? `You have ${savedJobs.length} saved ${savedJobs.length === 1 ? 'job' : 'jobs'}`
                : 'Your bookmarked career opportunities'}
            </p>
          </div>
        </div>
      </motion.div>

      {savedJobs.length === 0 ? (
        <motion.div
          className="no-jobs"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ padding: '6rem 2rem', textAlign: 'center' }}
        >
          <div className="no-jobs-icon" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🔖</div>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>No saved jobs yet</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
            Browse our latest job openings and save the ones that catch your eye!
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
            {savedJobs.map((job) => (
              <JobCard
                key={job.job_id}
                job={job}
                onDelete={handleDelete}
                isSaved={true}
                onToggleSave={handleToggleSave}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export default SavedJobs;