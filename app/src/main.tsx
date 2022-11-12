import React from "react";
import ReactDOM from "react-dom/client";
import App from "./index";
import { AuthProvider } from "../context/auth-provider";
import "../styles/app.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
