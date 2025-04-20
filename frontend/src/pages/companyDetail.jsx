import React from "react";
import { FaTrash, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

const JobDetail = ({ company, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      onDelete(company.company_id);
    }
  };
  console.log(company);

  return (
    <div className="company-card">
      <div className="job-card-header">
        <div className="headertop">
        <h3 className="job-title company-title">
          <span className="company-logo">
            <img src={company.companylogo} alt="" />
          </span>
          {company.name}</h3>
        <button className="delete-btn" onClick={handleDelete}>
          <FaTrash />
        </button>
        </div>
        <p className="job-location">
          <FaMapMarkerAlt className="icon" />
          {company.description}</p>
        <a href={company.website}>{company.website}</a>
      </div>
    </div>
  );
};

export default JobDetail;