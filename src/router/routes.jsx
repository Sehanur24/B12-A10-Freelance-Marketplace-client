import { createBrowserRouter } from "react-router-dom";

// Layout
import MainLayout from "../layout/MainLayout";

// Pages
import Home from "../pages/Home/Home";
import AllJobs from "../pages/AllJobs/AllJobs";
import JobDetails from "../pages/JobDetails/JobDetails";
import AddJob from "../pages/AddJob/AddJob";
import UpdateJob from "../pages/UpdateJob/UpdateJob";
import MyAddedJobs from "../pages/MyAddedJobs/MyAddedJobs";
import MyAcceptedTasks from "../pages/MyAcceptedTasks/MyAcceptedTasks";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import NotFound from "../pages/NotFound";

// Protected Route
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            // HOME
            {
                index: true,
                element: <Home />,
            },

            // ALL JOBS
            {
                path: "allJobs",
                element: <AllJobs />,
            },

            // SINGLE JOB (protected)
            {
                path: "allJobs/:id",
                element: (
                    <ProtectedRoute>
                        <JobDetails />
                    </ProtectedRoute>
                ),
            },

            // ADD JOB (protected)
            {
                path: "addJob",
                element: (
                    <ProtectedRoute>
                        <AddJob />
                    </ProtectedRoute>
                ),
            },

            // MY ADDED JOBS (protected)
            {
                path: "myAddedJobs",
                element: (
                    <ProtectedRoute>
                        <MyAddedJobs />
                    </ProtectedRoute>
                ),
            },

            // UPDATE JOB (protected)
            {
                path: "updateJob/:id",
                element: (
                    <ProtectedRoute>
                        <UpdateJob />
                    </ProtectedRoute>
                ),
            },

            // ACCEPTED TASKS (protected)
            {
                path: "my-accepted-tasks",
                element: (
                    <ProtectedRoute>
                        <MyAcceptedTasks />
                    </ProtectedRoute>
                ),
            },

            // LOGIN / REGISTER
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },

            // 404
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);
