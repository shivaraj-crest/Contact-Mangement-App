import axios from "axios";

// Create an Axios instance
const api = axios.create({
    baseURL: "http://localhost:5000/api", // Replace with your actual backend URL
});

// Attach token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage

        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach token to request header
        }

        return config;
    },
    (error) => {
        return Promise.reject(error); // Handle request error
    }
);

export default api;
