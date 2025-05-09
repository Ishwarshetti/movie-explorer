// Search input with button


import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (query.trim()) {
      onSearch(query); // Trigger the search when the button is clicked or enter is pressed
    }
  };

  return (
    // On form submission, calls `onSearch` prop function with the entered query
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2}>
      <TextField
        label="Search for a movie"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
