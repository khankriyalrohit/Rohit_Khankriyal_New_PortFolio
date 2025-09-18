// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/", // all requests are relative to /api
});

// helper to set / clear token and persist in sessionStorage
export function setAdminToken(token) {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    sessionStorage.setItem("adminToken", token); // store token for current browser session
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("adminToken");
  }
}

// If page loads and there's token in sessionStorage - apply it
const existing = sessionStorage.getItem("adminToken");
if (existing) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${existing}`;
}

export default axiosInstance;
