import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../lib/axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-hot-toast";
import { FaCheck, FaTimes } from "react-icons/fa";

const MyAcceptedTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        setLoading(true);

        axios
            .get(`/my-accepted-tasks?email=${user.email}`)
            .then((res) => setTasks(res.data))
            .catch(() => toast.error("Failed to load accepted tasks"))
            .finally(() => setLoading(false));

    }, [user?.email]);

    const handleRemove = async (id) => {
        try {
            await axios.delete(`/my-accepted-tasks/${id}`);
            setTasks((prev) => prev.filter((t) => t._id !== id));
            toast.success("Task removed!");
        } catch {
            toast.error("Failed to remove task");
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">My Accepted Tasks</h2>

            {tasks.length === 0 ? (
                <p className="text-slate-400 text-center">No accepted tasks yet.</p>
            ) : (
                <div className="jobs-grid">
                    {tasks.map((task) => (
                        <div key={task._id} className="job-card flex flex-col justify-between">

                            <div>
                                <h3 className="job-title">{task.title}</h3>

                                <p className="job-meta text-sm mt-1">
                                    <span className="font-semibold">Category:</span> {task.category || "N/A"}
                                </p>

                                <p className="job-meta text-sm mt-1">
                                    <span className="font-semibold">Posted By:</span> {task.postedBy || "N/A"}
                                </p>

                                <p className="job-meta text-sm mt-2">
                                    <span className="font-semibold">Accepted At:</span>{" "}
                                    {task.acceptedAt
                                        ? new Date(task.acceptedAt).toLocaleString("en-US", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })
                                        : "N/A"}
                                </p>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleRemove(task._id)}
                                    className="btn-primary btn-sm flex items-center gap-2"
                                >
                                    <FaCheck /> DONE
                                </button>

                                <button
                                    onClick={() => handleRemove(task._id)}
                                    className="btn-outline btn-sm flex items-center gap-2"
                                >
                                    <FaTimes /> CANCEL
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyAcceptedTasks;
