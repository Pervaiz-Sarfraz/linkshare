import React, { useEffect, useState } from "react";
import { fetchJobs, deleteJob } from "../functionality/Api";
import JobCard from "./JobDetail";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs()
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs", err));
  }, []);

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs((prevJobs) => prevJobs.filter((job) => job.job_id !== jobId));
    } catch (err) {
      console.error("Error deleting job", err);
    }
  };

  if (!jobs.length) {
    return (
      <div>
        <h2>{jobs.length === 0 ? "There are no job posted yet!" : "Loading..."}</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Available Jobs</h2>
      <div className="job-list">
        {jobs.map((job, index) => (
          <JobCard key={job.job_id || `job-${index}`} job={job} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
