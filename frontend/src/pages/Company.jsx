import React, { useEffect, useState } from 'react'
import { deletecompany, fetchCompanies } from '../functionality/Api';
import CompanyDetail   from "./companyDetail";
function Company() {
    const [companies, setCompanies] = useState([]);
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
            console.error("Error deleting job", err);
          }
        };
      if (!companies.length) {
        return <div><h2>{companies.length === 0 ? "There are no companies posted yet!" : "Loading..."}</h2></div>;
      }
      console.log(companies);
      
  return (
    <div>
        <div className="job-list">
        {companies.map((company, index) => (
     <CompanyDetail key={company.company_id || `job-${index}`} company={company} onDelete={handleDelete}/>  
))}
   </div>
    </div>
  )
}

export default Company