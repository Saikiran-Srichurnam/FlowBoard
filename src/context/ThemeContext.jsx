
import { createContext, useContext, useEffect, useState } from "react";
import { THEME } from "../constants/theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("flowboard-theme");

      return savedTheme === THEME.DARK
        ? THEME.DARK
        : THEME.LIGHT;
    } catch {
      return THEME.LIGHT;
    }
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === THEME.DARK);

    try {
      localStorage.setItem("flowboard-theme", theme);
    } catch (error) {
      console.error("Unable to save theme preference:", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === THEME.LIGHT
        ? THEME.DARK
        : THEME.LIGHT
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isDark: theme === THEME.DARK,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
