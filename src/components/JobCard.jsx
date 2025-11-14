import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

const JobCard = ({ job }) => {
    const { _id, title, category, postedBy, summary, coverImage } = job;

    return (
        <Motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{
                y: -5,
                boxShadow: "0 8px 25px rgba(96,165,250,0.45)",
            }}
            className="job-card flex flex-col"
        >
            <img src={coverImage} alt={title} className="job-cover" />

            <h3 className="job-title mt-3">{title}</h3>

            <p className="job-meta">
                <span className="font-semibold text-slate-300">Category:</span> {category}
            </p>

            <p className="job-meta">
                <span className="font-semibold text-slate-300">Posted By:</span> {postedBy}
            </p>

            <p className="job-meta line-clamp-2">{summary}</p>

            <div className="job-footer mt-3">
                <Link to={`/allJobs/${_id}`}>
                    <button className="btn-primary btn-sm">View Details</button>
                </Link>
            </div>
        </Motion.div>
    );
};

export default JobCard;
