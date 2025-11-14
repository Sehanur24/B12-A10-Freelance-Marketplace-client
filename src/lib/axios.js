// src/lib/axios.js
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // set in .env
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

export default api;
