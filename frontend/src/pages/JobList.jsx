import React, { useEffect, useState } from "react";
import { fetchJobs, deleteJob, saveJob, getSaveJobs, unSaveJob } from "../functionality/Api";
import JobCard from "./JobDetail";
import Search from "../comp/Search";
import { useMessage } from "../context/MessageContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";
import Loader from "../comp/Loader";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const JobList = () => {
  const [jobs, setJobs]               = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [savedJobs, setSavedJobs]     = useState([]);
  const [title, setTitle]             = useState("");
  const [company, setCompany]         = useState("");
  const [location, setLocation]       = useState("");
  const [loading, setLoading]         = useState(true);
  const { setMessage }                = useMessage();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const jobsRes  = await fetchJobs();
        setJobs(jobsRes.data);
        setFilteredJobs(jobsRes.data);
        const savedRes = await getSaveJobs();
        setSavedJobs(savedRes.data.map((job) => job.job_id));
      } catch (err) {
        console.error("Error fetching jobs or saved jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(title.toLowerCase()) &&
      job.company.toLowerCase().includes(company.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [title, company, location, jobs]);

  if (loading) return <Loader />;

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs((prev) => prev.filter((job) => job.job_id !== jobId));
      setSavedJobs((prev) => prev.filter((id) => id !== jobId));
    } catch (err) {
      console.error("Error deleting job", err);
    }
  };

  const handleToggleSave = async (jobId) => {
    try {
      if (savedJobs.includes(jobId)) {
        const savedRes = await getSaveJobs();
        const savedJob = savedRes.data.find((j) => j.job_id === jobId);
        if (savedJob) {
          await unSaveJob(savedJob.id);
          setSavedJobs((prev) => prev.filter((id) => id !== jobId));
          setMessage("Job removed from saved list.");
        }
      } else {
        await saveJob(jobId);
        setSavedJobs((prev) => [...prev, jobId]);
        setMessage("Job saved successfully! ✨");
      }
    } catch (err) {
      console.error("Error toggling saved job", err);
      setMessage("Failed to save the job. Please try again.");
    }
  };

  return (
    <div>
      <Search
        title={title}       setTitle={setTitle}
        company={company}   setCompany={setCompany}
        location={location} setLocation={setLocation}
      />

      {/* Results count */}
      <motion.p
        className="job-list-header"
        key={filteredJobs.length}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Showing <span>{filteredJobs.length}</span>{" "}
        {filteredJobs.length === 1 ? "job" : "jobs"}
        {(title || company || location) && " matching your search"}
      </motion.p>

      <motion.div
        className="job-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredJobs.length === 0 ? (
            <motion.div
              className="no-jobs"
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="no-jobs-icon">🔍</div>
              <p>No jobs match your search. Try different keywords.</p>
            </motion.div>
          ) : (
            filteredJobs.map((job) => (
              <JobCard
                key={job.job_id}
                job={job}
                onDelete={handleDelete}
                isSaved={savedJobs.includes(job.job_id)}
                onToggleSave={handleToggleSave}
              />
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default JobList;
