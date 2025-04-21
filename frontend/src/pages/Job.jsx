import React, { useEffect, useState } from 'react';
import { deleteJob, fetchJobs } from '../functionality/Api';
import JobCard from '../pages/JobDetail';

function Job() {
  const [job, setJob] = useState([]);

  useEffect(() => {
    fetchJobs()
      .then((res) => setJob(res.data))
      .catch((err) => console.error("Error fetching jobs", err));
  }, []);

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJob((prev) => prev.filter((job) => job.job_id !== jobId));
    } catch (err) {
      console.error("Error deleting job", err);
    }
  };

  if (!job.length) {
    return (
      <div>
        <h2>
          {job.length === 0
            ? "There are no job posted yet!"
            : "Loading..."}
        </h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="job-list-title">Job Listings ({job.length})</h2>
      <div className="job-list">
        {job.map((jobItem, index) => (
          <JobCard
            key={jobItem.job_id || `job-${index}`}
            job={jobItem}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Job;
