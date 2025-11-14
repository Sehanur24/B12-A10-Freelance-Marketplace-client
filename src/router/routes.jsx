import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
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

import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [

            {
                index: true,
                element: <Home />,
            },


            {
                path: "allJobs",
                element: <AllJobs />,
            },


            {
                path: "allJobs/:id",
                element: (
                    <ProtectedRoute>
                        <JobDetails />
                    </ProtectedRoute>
                ),
            },


            {
                path: "addJob",
                element: (
                    <ProtectedRoute>
                        <AddJob />
                    </ProtectedRoute>
                ),
            },


            {
                path: "myAddedJobs",
                element: (
                    <ProtectedRoute>
                        <MyAddedJobs />
                    </ProtectedRoute>
                ),
            },


            {
                path: "updateJob/:id",
                element: (
                    <ProtectedRoute>
                        <UpdateJob />
                    </ProtectedRoute>
                ),
            },


            {
                path: "my-accepted-tasks",
                element: (
                    <ProtectedRoute>
                        <MyAcceptedTasks />
                    </ProtectedRoute>
                ),
            },


            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },


            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);
