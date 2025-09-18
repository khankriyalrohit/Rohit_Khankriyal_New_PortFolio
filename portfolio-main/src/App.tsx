import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { setAuthToken } from "@/utils/axiosInstance";
import ProtectedRoute from "@/components/ProtectedRoute"; // ✅ new import
import { setAdminToken } from "@/utils/axiosInstance";

const queryClient = new QueryClient();

const App = () => {

useEffect(() => {
  // restore token from session if present
  const token = sessionStorage.getItem("adminToken");
  if (token) setAdminToken(token);
}, []);


  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ✅ Wrap /admin inside ProtectedRoute */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
