import { NavLink, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { HiMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [openMenu, setOpenMenu] = useState(false);

    const linkClass = ({ isActive }) =>
        isActive ? "text-blue-400 font-semibold" : "text-slate-300";

    return (
        <header className="navbar-glass fixed top-0 left-0 w-full z-50">
            <div className="container-max flex items-center justify-between py-3">

            
                <Link to="/" className="logo-text">
                    Zylos
                </Link>

                
                <nav className="hidden md:flex items-center gap-6">
                    <NavLink to="/" className={linkClass}>Home</NavLink>
                    <NavLink to="/allJobs" className={linkClass}>All Jobs</NavLink>

                    {user && (
                        <>
                            <NavLink to="/addJob" className={linkClass}>Add a Job</NavLink>
                            <NavLink to="/myAddedJobs" className={linkClass}>My Added Jobs</NavLink>
                            <NavLink to="/my-accepted-tasks" className={linkClass}>My Accepted Tasks</NavLink>
                        </>
                    )}
                </nav>

                
                <div className="hidden md:flex items-center gap-4">
                    {!user && (
                        <>
                            <Link to="/login">
                                <button className="btn-primary">Login</button>
                            </Link>
                            <Link to="/register">
                                <button className="btn-primary">Register</button>
                            </Link>
                        </>
                    )}

                    {user && (
                        <>
                            <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                                <img src={user?.photoURL} className="avatar-img" alt="user" />
                            </div>

                            <button onClick={logout} className="btn-primary">
                                Logout
                            </button>
                        </>
                    )}
                </div>

                
                <div className="md:hidden flex items-center gap-3 relative">

                    
                    {user && (
                        <img
                            src={user?.photoURL}
                            alt="user"
                            className="w-9 h-9 rounded-full border border-blue-400"
                        />
                    )}

                    
                    <button
                        className="text-xl"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        <HiMenuAlt3 size={26} />
                    </button>

                    
                    {openMenu && (
                        <ul
                            className="
                                absolute right-0 top-12 w-48
                                bg-slate-800/80 backdrop-blur-md
                                border border-white/10 
                                rounded-xl p-4 flex flex-col gap-3
                                shadow-xl z-40
                            "
                        >
                            <NavLink
                                to="/"
                                className="text-slate-200 hover:text-white"
                                onClick={() => setOpenMenu(false)}
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/allJobs"
                                className="text-slate-200 hover:text-white"
                                onClick={() => setOpenMenu(false)}
                            >
                                All Jobs
                            </NavLink>

                            {user && (
                                <>
                                    <NavLink
                                        to="/addJob"
                                        className="text-slate-200 hover:text-white"
                                        onClick={() => setOpenMenu(false)}
                                    >
                                        Add a Job
                                    </NavLink>

                                    <NavLink
                                        to="/myAddedJobs"
                                        className="text-slate-200 hover:text-white"
                                        onClick={() => setOpenMenu(false)}
                                    >
                                        My Added Jobs
                                    </NavLink>

                                    <NavLink
                                        to="/my-accepted-tasks"
                                        className="text-slate-200 hover:text-white"
                                        onClick={() => setOpenMenu(false)}
                                    >
                                        My Accepted Tasks
                                    </NavLink>
                                </>
                            )}

                            <div className="border-t border-white/10 pt-2"></div>

                            {!user && (
                                <>
                                    <Link to="/login" onClick={() => setOpenMenu(false)}>
                                        <button className="btn-primary w-full">Login</button>
                                    </Link>

                                    <Link to="/register" onClick={() => setOpenMenu(false)}>
                                        <button className="btn-primary w-full">Register</button>
                                    </Link>
                                </>
                            )}

                            {user && (
                                <button
                                    onClick={() => {
                                        logout();
                                        setOpenMenu(false);
                                    }}
                                    className="btn-primary w-full"
                                >
                                    Logout
                                </button>
                            )}
                        </ul>
                    )}
                </div>

            </div>
        </header>
    );
};

export default Navbar;
