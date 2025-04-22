import React, { useEffect, useState } from 'react';
import { getSaveJobs } from '../functionality/Api';
import JobCard from './JobDetail'; // make sure you import this
// If you're using handleDelete or handleToggleSave, make sure to define or import them

function SavedJobs() {
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const savedRes = await getSaveJobs();
                console.log('savedRes', savedRes.data);
                
                setSavedJobs(savedRes.data);
            } catch (err) {
                console.error("Failed to fetch saved jobs", err);
            }
        };

        fetchSavedJobs();
    }, []);
    console.log('savedJobs', savedJobs);
    return (
        <div>
            <h1>Saved Jobs</h1>
            {savedJobs.length === 0 ? (
                <p>No saved jobs found.</p>
            ) : (
                <div className="job-list">
                    {savedJobs.map((jobitem) => (
                        <JobCard
                            key={jobitem.job_id}
                            job={jobitem}
                            onDelete={() => {}} 
                            isSaved={true}
                            onToggleSave={() => {}} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SavedJobs;
