import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "../../lib/axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const JobDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accepting, setAccepting] = useState(false);

    useEffect(() => {
        axios
            .get(`/jobs/${id}`)
            .then((res) => setJob(res.data))
            .catch(() => toast.error("Failed to load job"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <LoadingSpinner />;

    if (!job)
        return <div className="text-center text-slate-300 py-10">Job not found</div>;

    const acceptJob = async () => {
        if (!user?.email) return toast.error("Please login to accept jobs");
        if (job.userEmail === user.email)
            return toast.error("You cannot accept your own job!");

        setAccepting(true);

        try {
            await axios.post("/accept-task", {
                jobId: job._id,
                title: job.title,
                acceptedBy: user.email,
            });
            toast.success("Job accepted!");
            navigate("/my-accepted-tasks");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to accept job");
        } finally {
            setAccepting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-4 bg-slate-800/40 p-4 rounded-2xl shadow-xl border border-white/10 backdrop-blur-md">

            <img
                src={job.coverImage}
                alt={job.title}
                className="w-full h-64 object-cover rounded-xl mb-4"
            />

            <h1 className="text-4xl font-bold site-logo mb-3">
                {job.title}
            </h1>

            <div className="space-y-2 text-slate-300 mb-4">
                <p>
                    <span className="font-semibold text-slate-200">Category:</span>{" "}
                    {job.category}
                </p>
                <p>
                    <span className="font-semibold text-slate-200">Posted By:</span>{" "}
                    {job.postedBy}
                </p>
                <p>
                    <span className="font-semibold text-slate-200">Posted At:</span>{" "}
                    {new Date(job.postedAt).toLocaleString()}
                </p>
            </div>

            <p className="text-lg text-slate-300 leading-relaxed mb-4">
                {job.summary}
            </p>

            <div className="flex gap-4">
                <button
                    onClick={acceptJob}
                    disabled={accepting}
                    className="px-6 py-3 bg-linear-to-r from-blue-500 to-fuchsia-500 text-white rounded-xl font-medium hover:opacity-90 transition shadow-lg"
                >
                    {accepting ? "Processing…" : "Accept Job"}
                </button>

                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 border border-slate-500 text-slate-200 rounded-xl hover:bg-slate-700/40 transition"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default JobDetails;
