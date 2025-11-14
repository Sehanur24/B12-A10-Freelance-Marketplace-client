import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const { register, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);

        const name = form.get("name");
        const email = form.get("email");
        const photoURL = form.get("photoURL");
        const password = form.get("password");

        if (!/[A-Z]/.test(password)) return toast.error("At least one uppercase letter required.");
        if (!/[a-z]/.test(password)) return toast.error("At least one lowercase letter required.");
        if (password.length < 6) return toast.error("Password must be 6 characters or more.");

        setLoading(true);

        try {
            await register({ name, email, password, photoURL });
            toast.success("Registration successful!");
            navigate("/", { replace: true });
        } catch (err) {
            toast.error(err.message || "Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-10 flex justify-center">
            <div className="w-full max-w-[400px] bg-slate-800/40 p-8 rounded-xl backdrop-blur-xl border border-white/10 shadow-xl">

                <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>

                <form onSubmit={handleRegister} className="space-y-3">

                    <div>
                        <label className="block text-sm mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter full name"
                            required
                            className="w-full p-2.5 rounded-lg bg-slate-900/50 border border-white/10 text-slate-100 
                            focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            required
                            className="w-full p-2.5 rounded-lg bg-slate-900/50 border border-white/10 text-slate-100 
                            focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Photo URL</label>
                        <input
                            type="text"
                            name="photoURL"
                            placeholder="Enter photo URL"
                            required
                            className="w-full p-2.5 rounded-lg bg-slate-900/50 border border-white/10 text-slate-100 
                            focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            className="w-full p-2.5 rounded-lg bg-slate-900/50 border border-white/10 text-slate-100 
                            focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-lg bg-linear-to-r from-blue-500 to-fuchsia-500 text-white font-semibold shadow-md hover:shadow-lg transition"
                    >
                        {loading ? "Creating..." : "Register"}
                    </button>
                </form>

                <div className="my-2 text-center text-slate-400 text-sm">OR</div>

                <button
                    onClick={async () => {
                        setLoading(true);
                        try {
                            await signInWithGoogle();
                            toast.success("Signed in with Google!");
                            navigate("/", { replace: true });
                        } catch (err) {
                            toast.error(err.message || "Google signup failed!");
                        }
                        setLoading(false);
                    }}
                    disabled={loading}
                    className="w-full py-2.5 rounded-lg bg-linear-to-r from-blue-500 to-fuchsia-500 text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition"
                >
                    <FcGoogle className="text-xl" />
                    Continue with Google
                </button>

                <p className="text-center text-sm text-slate-300 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-400 underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
