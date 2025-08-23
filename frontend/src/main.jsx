import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx"; // ✅ import

createRoot(document.getElementById("root")).render(
  <StrictMode>
      {/* ✅ Wrap App in AuthProvider */}
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
  </StrictMode>
);
