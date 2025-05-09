// Top navigation bar with links to Home, Favorites (if logged in), Login/Logout, and theme toggle
// Uses context to toggle between light/dark mode
// Handles logout by clearing token and redirecting to login


import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext"; // Import the theme context

const Navbar = () => {
  const { mode, toggleTheme } = useThemeContext(); // Destructure mode and toggleTheme from context
  const isLoggedIn = !!localStorage.getItem("auth-token"); // Check if user is logged in
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🎥 Movie Explorer
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {isLoggedIn && (
            <Button color="inherit" component={Link} to="/favorites">
              Favorites
            </Button>
          )}
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "light" ? "🌙" : "☀️"} {/* Icon changes based on the current theme */}
          </IconButton>
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


