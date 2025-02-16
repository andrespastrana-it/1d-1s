"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  theme: "default",
  setTheme: (theme: string) => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(
      "theme-achievement",
      "theme-resilience",
      "theme-inspiration",
      "theme-historical"
    );
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
