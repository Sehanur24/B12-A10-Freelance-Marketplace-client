import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import JobCard from "../../components/JobCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async (sortType = "") => {
        setLoading(true);

        try {
            const res = await axios.get(`/jobs?sort=${sortType}`);
            setJobs(res.data);
        } catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };

    const handleSort = (e) => {
        const value = e.target.value;
        fetchJobs(value);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold site-logo">All Jobs</h2>

                <select
                    onChange={handleSort}
                    defaultValue=""
                    className="px-4 py-2 bg-slate-600 border border-blue-500 text-slate-200 rounded-lg w-48"
                >
                    <option value="" disabled>
                        Sort by Date
                    </option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>

            <div className="jobs-grid">
                {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default AllJobs;
