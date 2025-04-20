import React, { useEffect, useState } from 'react'
import { fetchJobs } from '../functionality/Api';
import JobCard from '../pages/JobDetail';
function Job() {
    const [job, setJob] = useState([]);
      useEffect(() => {
        fetchJobs()
          .then((res) => setJob(res.data))
          .catch((err) => console.error("Error fetching jobs", err));
      }, []);
      if (!job.length) {
        return <div><h2>{job.length === 0 ? "There are no job posted yet!" : "Loading..."}</h2></div>;
      }
  return (
    <div>
        <div className="job-list">
      {job.map((job, index) => (
    <JobCard key={job.Job_id || `job-${index}`} job={job} />
))}
      </div>
    </div>
  )
}

export default Job
