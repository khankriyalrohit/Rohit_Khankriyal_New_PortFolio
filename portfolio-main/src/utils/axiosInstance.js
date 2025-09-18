// src/utils/axiosInstance.js
import axios from "axios";

// Use environment variable (set in .env.development / .env.production)
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/", 
});

// Helper to set / clear JWT token and persist in sessionStorage
export function setAdminToken(token) {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    sessionStorage.setItem("adminToken", token); // ✅ store for current session
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("adminToken");
  }
}

// If page reloads and token exists → apply it
const existing = sessionStorage.getItem("adminToken");
if (existing) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${existing}`;
}

export default axiosInstance;
