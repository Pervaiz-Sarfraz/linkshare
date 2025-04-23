import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaMapMarkerAlt, FaBuilding, FaStar, FaRegStar } from "react-icons/fa";

const JobDetail = ({ job, onDelete, isSaved, onToggleSave }) => {
  const navigate = useNavigate();
console.log('job is there', job);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      onDelete(job.job_id);
    }
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-card-title-row">
          <h3 className="job-title">{job.title ?? job.job_title}</h3>
          <div className="icon-actions">
            <button className="save-btn" onClick={() => onToggleSave(job.job_id)}>
              {isSaved ? <FaStar color="green" className="heart"/> : <FaRegStar className="heart"/>}
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              <FaTrash />
            </button>
          </div>
        </div>

        <div className="job-company">
          <FaBuilding className="icon" />
          <span>{job.company ?? job.job_company}</span>
        </div>

        <p className="job-description">{job.description ?? job.job_description}</p>

        <div className="job-location">
          <FaMapMarkerAlt className="icon" />
          <span>{job.location ?? job.job_location}</span>
        </div>
      </div>

      <div className="job-card-footer">
        <button
          className="apply-button"
          onClick={() => navigate(`/jobs/${job.job_id}/apply`)}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetail;
