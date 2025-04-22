import React, { useEffect, useState } from "react";
import { fetchJobs, deleteJob, saveJob, getSaveJobs, unSaveJob } from "../functionality/Api";
import JobCard from "./JobDetail";
import Search from "../comp/Search";
import { useMessage } from "../context/MessageContext";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const { setMessage } = useMessage();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const jobsRes = await fetchJobs();
        setJobs(jobsRes.data);
        setFilteredJobs(jobsRes.data);

        const savedRes = await getSaveJobs();
        console.log('savedRes', savedRes);
        
        const savedJobIds = savedRes.data.map((job) => job.job_id); 
        setSavedJobs(savedJobIds);
      } catch (err) {
        console.error("Error fetching jobs or saved jobs", err);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const searchTitle = title.toLowerCase();
    const searchCompany = company.toLowerCase();
    const searchLocation = location.toLowerCase();

    const filtered = jobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(searchTitle) &&
        job.company.toLowerCase().includes(searchCompany) &&
        job.location.toLowerCase().includes(searchLocation)
      );
    });

    setFilteredJobs(filtered);
  }, [title, company, location, jobs]);

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
        setMessage("Job saved successfully.");
        
      }
    } catch (err) {
      console.error("Error toggling saved job", err);
      setMessage("Failed to save the job. Please try again.");
    }
  };
  

  return (
    <div>
      <Search
        title={title}
        setTitle={setTitle}
        company={company}
        setCompany={setCompany}
        location={location}
        setLocation={setLocation}
      />
      <h2>Available Jobs ({filteredJobs.length})</h2>
      <div className="job-list">
        {filteredJobs.length === 0 ? (
          <p>No jobs match your search.</p>
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
      </div>
    </div>
  );
};

export default JobList;
