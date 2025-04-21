import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createJob, fetchCompanies } from "../functionality/Api";
import { useMessage } from "../context/MessageContext";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const { setMessage } = useMessage();
  useEffect(() => {
    fetchCompanies()
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJob({
        title,
        description,
        location,
        company_id: parseInt(companyId),
      });
      setMessage("Job posted successfully!");
      setTitle("");
      setDescription("");
      setLocation("");
      setCompanyId("");
      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage("Error posting job");
    }
  };

  return (
    <div className="job-form-container">
      <h2 className="job-form-title">Post a Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <label className="job-form-label">Job Title:</label>
        <input
          className="job-form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="job-form-label">Description:</label>
        <textarea
          className="job-form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="job-form-label">Location:</label>
        <input
          className="job-form-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label className="job-form-label">Company:</label>
        <select
          className="job-form-select"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          required
        >
          <option value="">-- Select Company --</option>
          {companies.map((company) => (
            <option key={company.company_id} value={company.company_id}>
              {company.name}
            </option>
          ))}
        </select>

        <button type="submit" className="job-form-button">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;