import { useState } from "react";
import { createCompany } from "../functionality/Api";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../context/MessageContext";
import { motion } from "framer-motion";
import { FiPlusSquare, FiMapPin, FiGlobe, FiFileText, FiImage, FiUpload } from "react-icons/fi";

const AddCompany = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setMessage } = useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("location", location);
      formData.append("website", website);
      formData.append("description", description);
      formData.append("companylogo", companyLogo);
      
      const company = await createCompany(formData);      
      if (company.status === 201) {
        setMessage("Company added successfully! 🏢");
        navigate("/companies");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error adding company. Make sure all fields are valid.");
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
          <FiPlusSquare size={28} />
        </div>
        <h2 className="form-title" style={{ fontSize: '1.8rem' }}>Register Company</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.5rem' }}>
          Showcase your culture and current openings
        </p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Company Name</label>
          <input
            placeholder="e.g. Google, Inc."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label className="form-label">Location</label>
            <input
              placeholder="e.g. Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="form-label">Website URL</label>
            <input
              type="url"
              placeholder="https://company.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Company Description</label>
          <textarea
            placeholder="Tell us about the mission and perks..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Company Logo</label>
          <div style={{ position: 'relative' }}>
            <input
              type="file"
              onChange={(e) => setCompanyLogo(e.target.files[0])}
              accept="image/*"
              required
            />
          </div>
        </div>

        <motion.button 
          type="submit" 
          disabled={loading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {loading ? "Registering..." : "Create Company Profile"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddCompany;