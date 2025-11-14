import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../lib/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const isValidUrl = (str) => {
    try {
        const u = new URL(str);
        return u.protocol === "http:" || u.protocol === "https:";
    } catch {
        return false;
    }
};

const AddJob = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleAddJob = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const title = form.title.value.trim();
        const category = form.category.value;
        const summary = form.summary.value.trim();
        const coverImage = form.coverImage.value.trim();

        if (title.length < 3) {
            toast.error("Title must be at least 3 characters.");
            setLoading(false);
            return;
        }
        if (!category) {
            toast.error("Please select a category.");
            setLoading(false);
            return;
        }
        if (summary.length < 20 || summary.length > 500) {
            toast.error("Summary must be between 20 and 500 characters.");
            setLoading(false);
            return;
        }
        if (!isValidUrl(coverImage)) {
            toast.error("Please provide a valid image URL (http/https).");
            setLoading(false);
            return;
        }

        const newJob = {
            title,
            postedBy: user?.displayName || "Anonymous",
            category,
            summary,
            coverImage,
            userEmail: user?.email,
        };

        try {
            await axios.post("/jobs", newJob);
            toast.success("Job added successfully!");
            navigate("/myAddedJobs");
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to add job");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold site-logo mb-6 text-center">Create a New Job</h2>

            <form
                onSubmit={handleAddJob}
                className="bg-slate-800/40 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-white/10 space-y-4 shadow-xl"
            >
                <div>
                    <label className="block mb-1 text-sm text-slate-300">Job Title</label>
                    <input name="title"
                        placeholder="Enter job title"
                        required
                        className="w-full p-3 rounded-xl bg-slate-700/30 border border-white/10 text-slate-100 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-slate-300">Posted By</label>
                    <input value={user?.displayName || ""}
                        readOnly
                        className="w-full p-3 rounded-xl bg-slate-700/20 border border-white/6 text-slate-400 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-slate-300">Category</label>
                    <select name="category" required className="w-full p-3 rounded-xl bg-slate-700/50 border border-white/10">
                        <option value="">Select Category</option>
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
                    <textarea name="summary"
                        required
                        className="w-full h-32 p-3 rounded-xl bg-slate-700/30 border border-white/10 text-slate-100"
                        placeholder="Short job description (20-500 chars)"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-slate-300">Cover Image URL</label>
                    <input name="coverImage"
                        required
                        placeholder="https://..."
                        className="w-full p-3 rounded-xl bg-slate-700/30 border border-white/10 text-slate-100"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-slate-300">User Email</label>
                    <input value={user?.email || ""} readOnly className="w-full p-3 rounded-xl bg-slate-700/20 border border-white/6 text-slate-400 cursor-not-allowed" />
                </div>

                <button disabled={loading} className="w-full py-3 rounded-xl bg-linear-to-r from-blue-500 to-fuchsia-500 text-white font-semibold">
                    {loading ? "Submitting…" : "Add Job"}
                </button>
            </form>
        </div>
    );
};

export default AddJob;
