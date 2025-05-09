
// Creates a custom context to handle theme (light/dark mode)
import React, { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

// Custom hook to access theme context
export const useThemeContext = () => useContext(ThemeContext);

// Theme context provider to wrap the app with light/dark theme toggle
const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Memoize theme creation to avoid unnecessary recalculations
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Normalize CSS across browsers */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
