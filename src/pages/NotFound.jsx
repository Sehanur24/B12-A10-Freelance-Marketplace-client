import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="page-404">
            <div>
                <h1 className="text-7xl font-bold">404</h1>
                <p className="text-slate-300 mb-4">Oops! Page Not Found</p>
                <Link to="/" className="btn-primary">Back To Home</Link>
            </div>
        </div>
    );
};

export default NotFound;
