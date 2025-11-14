import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";

const UpdateJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        axios.get(`/jobs/${id}`)
            .then((res) => setJob(res.data))
            .catch(() => toast.error("Failed to load job"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <LoadingSpinner />
            </div>
        );

    if (!job)
        return <div className="text-center py-10">Job not found</div>;

    const updateJob = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const form = e.target;

        const updated = {
            title: form.title.value.trim(),
            category: form.category.value,
            summary: form.summary.value.trim(),
            coverImage: form.coverImage.value.trim(),
        };

        if (updated.title.length < 3) {
            toast.error("Title must be at least 3 characters.");
            setSubmitting(false);
            return;
        }
        if (updated.summary.length < 20) {
            toast.error("Summary must be at least 20 characters.");
            setSubmitting(false);
            return;
        }

        try {
            await axios.put(`/jobs/${id}`, updated);
            toast.success("Job Updated!");
            navigate("/myAddedJobs");
        } catch {
            toast.error("Failed to update job");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-6 px-4">
            <h2 className="text-3xl font-bold site-logo text-center mb-6">
                Update Job
            </h2>

            <form
                onSubmit={updateJob}
                className="bg-slate-800/40 backdrop-blur-md p-10 rounded-2xl border border-white/10 space-y-6 shadow-xl"
            >
                <div>
                    <label className="block mb-1 text-sm text-slate-300">Job Title</label>
                    <input
                        name="title"
                        defaultValue={job.title}
                        required
                        className="w-full p-4 rounded-xl bg-slate-700/40 border border-white/20 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-slate-300">Category</label>
                    <select
                        name="category"
                        required
                        defaultValue={job.category}
                        className="w-full p-4 rounded-xl bg-slate-700/40 border border-white/20 text-slate-100 appearance-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option>Web Development</option>
                        <option>Graphics Design</option>
                        <option>Digital Marketing</option>
                        <option>Content Writing</option>
                        <option>Video Editing</option>
                        <option>UI/UX Design</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 text-sm text-slate-300">Summary</label>
                    <textarea
                        name="summary"
                        defaultValue={job.summary}
                        required
                        className="w-full h-36 p-4 rounded-xl bg-slate-700/40 border border-white/20 text-slate-100 resize-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-1 text-sm text-slate-300">Cover Image URL</label>
                    <input
                        name="coverImage"
                        required
                        defaultValue={job.coverImage}
                        className="w-full p-4 rounded-xl bg-slate-700/40 border border-white/20 text-slate-100 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-linear-to-r from-blue-500 to-fuchsia-500 text-white font-semibold shadow-md hover:shadow-lg transition"
                >
                    {submitting ? "Updating…" : "Update Job"}
                </button>
            </form>
        </div>
    );
};

export default UpdateJob;
