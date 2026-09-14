import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.js";
import { tema } from "./theme.js";
import ToastifyComponent from "./components/ToastifyComponent.js";
import { AuthProvider } from "./contexts/AuthContext.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <ToastifyComponent>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToastifyComponent>
    </ThemeProvider>
  </React.StrictMode>,
);
