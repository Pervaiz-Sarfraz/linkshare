import React from "react";
import { useEffect } from "react";
import { fetchApplication } from "../functionality/Api";
import { useState } from "react";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    fetchApplication().
      then((res) => setApplications(res.data))
      .catch((err) => console.error("Error fetching applications", err));
  }, []);
  console.log(applications);

  return (
    <div>
      <h2>My Applications</h2>
      <div className="apply_list">
        {applications.map((application, index) => (
          <div key={application.application_id || `application-${index}`} className="job-card">
            <div className="job-card-header">
              <h3 className="job-title">{application.applied_at}</h3>
              <div>
                <a href={application?.resume} download>
                  Download Resume
                </a>
              </div>
            </div>
            <div className="job-card-footer">
              <p>Job Id: {application.job}</p>
            </div>
          </div>
        ))

        }
      </div>
    </div>
  );
};

export default MyApplications;
