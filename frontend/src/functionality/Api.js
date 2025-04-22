import axiosInstance from "./axiosInstance"; 
export const fetchCompanies = () => axiosInstance.get(`/companies/`);
export const fetchJobs = () => axiosInstance.get(`/jobs/`);
export const fetchJobById = (id) => axiosInstance.get(`/jobs/${id}/`);
export const createCompany = (companyData) =>
  axiosInstance.post(`/companies/`, companyData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const createJob = (jobData) =>
  axiosInstance.post(`/jobs/`, jobData);

export const applyToJob = (applicationData) =>
  axiosInstance.post(`/applications/`, applicationData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const register = (email, password) =>
  axiosInstance.post(`/register/`, { email, password });

export const login = (email, password) =>
  axiosInstance.post(`/login/`, { email, password });
export const deleteJob = (jobId) =>
    axiosInstance.delete(`/jobs/${jobId}/`);
export const deletecompany = (companyId) =>
    axiosInstance.delete(`/companies/${companyId}/`);
export const getSingleJob = (jobId) =>
    axiosInstance.get(`/jobs/${jobId}/`);
  export const fetchApplication = () =>
    axiosInstance.get(`/applications`);
  export const saveJob = (jobId) =>
    axiosInstance.post(`/save-job/`, { job_id: jobId });
  export const getSaveJobs = () =>
    axiosInstance.get(`/save-job/`);
  
  export const unSaveJob = (savedJobId) =>
    axiosInstance.delete(`/save-job/${savedJobId}/`);
  
  