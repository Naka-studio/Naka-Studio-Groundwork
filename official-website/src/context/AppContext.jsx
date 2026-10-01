import { createContext, useContext, useEffect, useState } from "react";

function detectLanguage() {
  return navigator.language?.toLowerCase().startsWith("id") ? "id" : "en";
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("naka-lang") || detectLanguage(),
  );

  const [theme, setTheme] = useState(
    () => localStorage.getItem("naka-theme") || "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang;
    localStorage.setItem("naka-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("naka-lang", lang);
  }, [lang]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const toggleLang = () => setLang((l) => (l === "en" ? "id" : "en"));

  return (
    <AppContext.Provider value={{ lang, theme, toggleTheme, toggleLang }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
