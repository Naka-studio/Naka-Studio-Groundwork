import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./context/AppContext";
import "./styles/main.scss";
import App from "./App.jsx";

// Eruda - dev only
if (import.meta.env.DEV) {
  import("eruda").then((e) => e.default.init());
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
