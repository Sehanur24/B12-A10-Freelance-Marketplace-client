import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const { login, signInWithGoogle } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);

        const email = form.get("email");
        const password = form.get("password");

        setLoading(true);

        try {
            await login(email, password);
            toast.success("Login successful!");
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(err.message || "Login failed!");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
            toast.success("Logged in with Google!");
            navigate(from, { replace: true });
        } catch (err) {
            toast.error(err.message || "Google signup failed!");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-10 flex justify-center">
            <div className="w-full max-w-[400px] bg-slate-800/40 p-8 rounded-xl backdrop-blur-xl border border-white/10 shadow-xl">

                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

                <form onSubmit={handleLogin} className="space-y-3">

                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
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

                    <p className="text-right text-xs text-slate-400 hover:text-slate-200 cursor-pointer">
                        Forget password?
                    </p>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-lg text-white font-semibold 
                        bg-linear-to-r from-blue-500 to-fuchsia-500 shadow-md hover:shadow-lg transition"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                <div className="my-2 text-center text-slate-400 text-sm">OR</div>

                <button
                    onClick={handleGoogle}
                    disabled={loading}
                    className="w-full py-2.5 rounded-lg text-white font-semibold flex items-center justify-center gap-2 
                    bg-linear-to-r from-blue-500 to-fuchsia-500 shadow-md hover:shadow-lg transition"
                >
                    <FcGoogle className="text-xl" />
                    Continue with Google
                </button>

                <p className="text-center text-sm text-slate-300 mt-4">
                    New here?{" "}
                    <Link to="/register" className="text-blue-400 underline">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
