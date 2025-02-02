import axios from "axios";
import { getToken } from "./auth";

// Create a configured axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",  // Your backend base URL
});

// Add a request interceptor to include the token in the headers
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // Add the token to the Authorization header for protected routes
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Token expired or invalid, redirect to login page
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
  

export default API;
