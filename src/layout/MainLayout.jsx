import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    const { pathname } = useLocation();

    const noContainerPages = ["/", "/login", "/register", "/addJob"];

    const useContainer =
        !noContainerPages.includes(pathname) &&
        !pathname.startsWith("/updateJob");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">

            <Navbar />

            <main className={`flex-1 py-6 mt-16 ${useContainer ? "container-max" : ""}`}>
                <Outlet />
            </main>

            <Footer />

        </div>
    );
};

export default MainLayout;
