// src/components/Admin/AdminLoginModal.jsx
import React, { useState } from "react";
import axiosInstance, { setAdminToken } from "@/utils/axiosInstance";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminLoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // POST to /api/admin/login (axiosInstance.baseURL = /api)
      const { data } = await axiosInstance.post("/api/admin/login", { passcode });

      // Set token globally and persist in sessionStorage
      setAdminToken(data.token);

      // close modal and navigate
      onClose?.();
      onSuccess?.(); // optional callback
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid passcode! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-card p-6 rounded-xl shadow-lg w-80 animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4 text-center">Enter Admin Passcode</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Admin Passcode"
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end space-x-3">
            <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Checking..." : "Enter"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
