import React, { useEffect, useState } from 'react';
import { deleteJob, saveJob, getSaveJobs, unSaveJob } from "../functionality/Api";
import JobCard from './JobDetail';
import { useMessage } from '../context/MessageContext';

function SavedJobs() {
    const [savedJobs, setSavedJobs] = useState([]);
    const { setMessage } = useMessage();

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const savedRes = await getSaveJobs();
                setSavedJobs(savedRes.data); // Assuming this returns array of job objects
            } catch (err) {
                console.error("Failed to fetch saved jobs", err);
                setMessage("Failed to load saved jobs");
            }
        };

        fetchSavedJobs();
    }, []);

    const handleDelete = async (jobId) => {
        try {
            await deleteJob(jobId);
            setSavedJobs(prev => prev.filter(job => job.job_id !== jobId));
            setMessage("Job deleted successfully");
        } catch (err) {
            console.error("Error deleting job", err);
            setMessage("Failed to delete job");
        }
    };

    const handleToggleSave = async (jobId) => {
        try {
            const isCurrentlySaved = savedJobs.some(job => job.job_id === jobId);
            
            if (isCurrentlySaved) {
                // Find the saved job entry to get its ID
                const savedJob = savedJobs.find(job => job.job_id === jobId);
                if (savedJob) {
                    await unSaveJob(savedJob.id);
                    setSavedJobs(prev => prev.filter(job => job.job_id !== jobId));
                    setMessage("Job removed from saved list");
                }
            } else {
                await saveJob(jobId);
                // You might want to fetch the updated list here or optimistically update
                const savedRes = await getSaveJobs();
                setSavedJobs(savedRes.data);
                setMessage("Job saved successfully");
            }
        } catch (err) {
            console.error("Error toggling saved job", err);
            setMessage("Failed to update saved status");
        }
    };

    return (
        <div>
            <h1>Saved Jobs</h1>
            {savedJobs.length === 0 ? (
                <p>No saved jobs found.</p>
            ) : (
                <div className="job-list">
                    {savedJobs.map((job) => (
                        <JobCard
                            key={job.job_id}
                            job={job}
                            onDelete={handleDelete}
                            isSaved={true} // Since this is the SavedJobs component, all jobs here are saved
                            onToggleSave={handleToggleSave}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SavedJobs;