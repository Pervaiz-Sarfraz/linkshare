import React, { useEffect, useState } from 'react'
import { deletecompany, fetchCompanies } from '../functionality/Api';
import CompanyDetail   from "./companyDetail";
import { useMessage } from "../context/MessageContext";
function Company() {
    const [companies, setCompanies] = useState([]);
    const {setMessage} = useMessage();
      useEffect(() => {
        fetchCompanies()
          .then((res) => setCompanies(res.data))
          .catch((err) => console.error("Error fetching jobs", err));
      }, []);
        const handleDelete = async (companyId) => {
          try {
            await deletecompany(companyId);
            setCompanies((prevcompanys) => prevcompanys.filter((company) => company.company_id !== companyId));
          } catch (err) {
            setMessage("Error deleting job", err);
          }
        };
      if (!companies.length) {
        return <div><h2>{companies.length === 0 ? "There are no companies posted yet!" : "Loading..."}</h2></div>;
      }
      console.log(companies);
      
  return (
    <div>
      <h2 className="job-list-title">Company Listings({companies.length})</h2>
        <div className="job-list">
        {companies.map((company, index) => (
     <CompanyDetail key={company.company_id || `job-${index}`} company={company} onDelete={handleDelete}/>  
))}
   </div>
    </div>
  )
}

export default Company