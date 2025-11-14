import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../lib/axios";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router-dom";

const ConfirmModal = ({ open, title, onConfirm, onClose }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-slate-800 rounded-lg p-6 w-11/12 max-w-md">
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="btn-outline">Cancel</button>
                    <button onClick={onConfirm} className="btn-primary">Confirm</button>
                </div>
            </div>
        </div>
    );
};

const MyAddedJobs = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        if (!user?.email) return;
        setLoading(true);
        axios.get(`/myAddedJobs?email=${user.email}`)
            .then(res => setJobs(res.data))
            .catch(() => toast.error("Failed to load your jobs"))
            .finally(() => setLoading(false));
    }, [user?.email]);

    const askDelete = (id) => {
        setSelectedId(id);
        setConfirmOpen(true);
    };

    const handleDelete = async () => {
        setConfirmOpen(false);
        if (!selectedId) return;
        try {
            await axios.delete(`/jobs/${selectedId}`);
            setJobs(prev => prev.filter(j => j._id !== selectedId));
            setSelectedId(null);
            toast.success("Job deleted successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Delete failed");
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">My Added Jobs</h2>

            {jobs.length === 0 ? (
                <p className="text-slate-400 text-center">No added job yet.</p>
            ) : (
                <div className="jobs-grid">
                    {jobs.map(job => (
                        <div key={job._id} className="job-card">
                            <img src={job.coverImage} className="job-cover rounded-md" alt={job.title} />

                            <h3 className="job-title mt-3">{job.title}</h3>
                            <p className="job-meta">Category: {job.category}</p>

                            <div className="mt-3 flex gap-2">
                                <Link to={`/updateJob/${job._id}`}>
                                    <button className="btn-primary btn-sm">Update</button>
                                </Link>

                                <button
                                    onClick={() => askDelete(job._id)}
                                    className="btn-outline btn-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ConfirmModal
                open={confirmOpen}
                title="Are you sure you want to delete this job?"
                onConfirm={handleDelete}
                onClose={() => setConfirmOpen(false)}
            />
        </div>
    );
};

export default MyAddedJobs;
