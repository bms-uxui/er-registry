import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ErRegistryDashboard from "./pages/ErRegistryDashboard.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import "./index.css";

const muiTheme = createTheme({
  typography: {
    fontFamily:
      '"Google Sans", "Google Sans Text", "Google Sans Display", "Noto Sans Thai", system-ui, sans-serif',
  },
  palette: {
    primary: { main: "#4285F4" },
    secondary: { main: "#34A853" },
    error: { main: "#EA4335" },
    warning: { main: "#FBBC05" },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <HeroUIProvider>
        <ThemeProvider theme={muiTheme}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/er-registry-dashboard" element={<ErRegistryDashboard />} />
          </Routes>
        </ThemeProvider>
      </HeroUIProvider>
    </HashRouter>
  </StrictMode>,
);
