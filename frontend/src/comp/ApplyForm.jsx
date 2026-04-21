import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { applyToJob, getSingleJob } from "../functionality/Api";
import { useMessage } from "../context/MessageContext";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";

const ApplyForm = () => {
  const { id } = useParams(); 
  const [job, setJob] = useState(null); 
  const [resume, setResume] = useState(null); 
  const [loading, setLoading] = useState(false);
  const { setMessage } = useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleJob(id)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append("job", id); 
    formData.append("user", localStorage.getItem("user_id"));
    formData.append("resume", resume);
  
    try {
      await applyToJob(formData);
      setMessage("Application submitted successfully! Good luck! 🎯");
      navigate("/applications");
    } catch (err) {
      console.error(err);
      setMessage("Error submitting application. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <motion.div 
      className="form-container"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="form-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ 
          width: '56px', height: '56px', background: 'var(--brand-glow)', 
          borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--brand)' 
        }}>
          <FiSend size={24} />
        </div>
        <h2 className="form-title" style={{ fontSize: '1.8rem' }}>Apply for Position</h2>
        {job && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.5rem' }}>
            Joining <strong>{job.company}</strong> as <strong>{job.title}</strong>
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Position</label>
          <input
            value={job ? job.title : "Loading position..."}
            disabled
            style={{ opacity: 0.8, cursor: 'not-allowed', background: 'var(--bg-elevated)' }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Upload Resume (PDF)</label>
          <div style={{ position: 'relative' }}>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
              required
            />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Please ensure your resume is up to date and in PDF format.
          </p>
        </div>

        <motion.button 
          type="submit" 
          disabled={loading || !job}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {loading ? "Sending Application..." : "Submit Application"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ApplyForm;