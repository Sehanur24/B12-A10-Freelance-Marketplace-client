// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./context/AuthProvider.jsx";
import { RouterProvider } from "react-router";
import { router } from "./router/routes.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {/* Global Toast System */}
      <Toaster position="top-center" />

      {/* React Router */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
