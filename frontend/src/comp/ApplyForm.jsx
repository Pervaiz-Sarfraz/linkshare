import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { applyToJob, getSingleJob } from "../functionality/Api";
import { useMessage } from "../context/MessageContext";

const ApplyForm = () => {
  const { id } = useParams(); 
  const [job, setJob] = useState(null); 
  const [resume, setResume] = useState(null); 
  const { setMessage } = useMessage();
  const navigate= useNavigate();
  useEffect(() => {
    getSingleJob(id)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("job", id); 
    formData.append("user", localStorage.getItem("user_id"));
    formData.append("resume", resume);
  
    try {
      await applyToJob(formData);
      setMessage("Application submitted!");
      navigate("/applications");
      setResume(null);
    } catch (err) {
      console.error(err);
      setMessage("Error applying for job.");
    }
  };
  
  return (
    <div className="form-container">
      <h2>Apply for a Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Job:</label>
        <select value={id} disabled>
          {job && (
            <option key={job.job_id} value={job.job_id}>
              {job.title}
            </option>
          )}
        </select>
        <label>Resume:</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          required
        />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyForm;