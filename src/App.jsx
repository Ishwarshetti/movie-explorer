
// Root app component with routing, theme context, and auth protection
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Container, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import MovieDetails from "./components/MovieDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import ThemeContextProvider, { useThemeContext } from "./context/ThemeContext";

const App = () => {
  const { mode } = useThemeContext();

  const theme = createTheme({
    palette: {
      mode: mode || "light",
    },
  });

  const isLoggedIn = !!localStorage.getItem("auth-token");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <MovieDetails />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

// Wrap App with ThemeContextProvider to enable theme switching
const AppWrapper = () => {
  return (
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  );
};

export default AppWrapper;
