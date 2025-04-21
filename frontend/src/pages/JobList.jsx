import React, { useEffect, useState } from "react";
import { fetchJobs, deleteJob } from "../functionality/Api";
import JobCard from "./JobDetail";
import Search from "../comp/Search"; 

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchJobs()
      .then((res) => {
        setJobs(res.data);
        setFilteredJobs(res.data);
      })
      .catch((err) => console.error("Error fetching jobs", err));
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
    } catch (err) {
      console.error("Error deleting job", err);
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
      <h2>Available Jobs({jobs.length})</h2>
      <div className="job-list">
        {filteredJobs.length === 0 ? (
          <p>No jobs match your search.</p>
        ) : (
          filteredJobs.map((job) => (
            <JobCard key={job.job_id} job={job} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;
