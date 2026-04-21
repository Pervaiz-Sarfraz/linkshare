import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createJob, fetchCompanies } from "../functionality/Api";
import { useMessage } from "../context/MessageContext";
import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin, FiLayers, FiCheckCircle } from "react-icons/fi";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setMessage } = useMessage();

  useEffect(() => {
    fetchCompanies()
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const jobsuccess = await createJob({
        title,
        description,
        location,
        company_id: parseInt(companyId),
      });
      if (jobsuccess.status === 201) {
        setMessage("Job posted successfully! ✨");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error posting job. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="form-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="form-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ 
          width: '56px', height: '56px', background: 'var(--brand-glow)', 
          borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--brand)' 
        }}>
          <FiBriefcase size={28} />
        </div>
        <h2 className="form-title" style={{ fontSize: '1.8rem' }}>Post a New Job</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.5rem' }}>
          Connect with top talent from around the world
        </p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Job Title</label>
          <input
            placeholder="e.g. Lead Product Designer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            placeholder="e.g. San Francisco, CA or Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Company</label>
          <select
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            required
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company.company_id} value={company.company_id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Job Description</label>
          <textarea
            placeholder="Describe the role and qualifications..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
          />
        </div>

        <motion.button 
          type="submit" 
          disabled={loading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {loading ? "Posting Job..." : "Publish Job Listing"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddJob;