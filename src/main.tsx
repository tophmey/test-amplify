import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";

// const Admin = React.lazy(() => import("./Admin.tsx"));

// const isAdmin = document.location.href.includes("admin.");

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <App />
  </React.StrictMode>
);
