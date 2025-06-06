import { useState } from "react";
import { createCompany } from "../functionality/Api";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../context/MessageContext";

const AddCompany = () => {
  const [name, setName] = useState("");
  const [companyId, setCompanyId] = useState(null);
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const navigate = useNavigate();
const {setMessage}= useMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", companyId);
      formData.append("name", name);
      formData.append("location", location);
      formData.append("website", website);
      formData.append("description", description);
      formData.append("companylogo", companyLogo);
      const company = await createCompany(formData);      
      if (company.status == 201) {
        setMessage("Company added!");
        navigate("/companies");
        setName("");
        setLocation("");
        setWebsite("");
        setDescription("");
        setCompanyLogo(null);        
      }
    } catch (err) {
      console.error(err);
      setMessage("Error adding company");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Company</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">Company Name:</label>
        <input
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="form-label">Location:</label>
        <input
          className="form-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label className="form-label">Website:</label>
        <input
        type="url"
          className="form-input"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <label className="form-label">Description:</label>
        <textarea
          className="form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="form-label">Company Logo:</label>
        <input
          className="form-input"
          type="file"
          onChange={(e) => {
            console.log(e.target.files[0]);
            setCompanyLogo(e.target.files[0]);
          }}
          accept="image/*"
          required
        />

        <button type="submit" className="form-button">
          Add Company
        </button>
      </form>
    </div>
  );
};

export default AddCompany;