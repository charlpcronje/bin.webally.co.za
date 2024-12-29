/* frontend/src/main.jsx */
/**
 * @file frontend/src/main.jsx
 * Main entry point for React + Tailwind + ShadCN-like UI.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
