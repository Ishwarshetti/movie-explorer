// Component for filtering movies by Genre, Year, and Rating
// Accepts current filter states and setter functions as props

import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Generate years from current year going back 25 years
const years = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i);

// Movie genre codes from TMDb
const genres = [
  { id: "28", name: "Action" },
  { id: "35", name: "Comedy" },
  { id: "18", name: "Drama" },
  { id: "27", name: "Horror" },
  { id: "10749", name: "Romance" },
  { id: "878", name: "Science Fiction" },
  { id: "16", name: "Animation" },
  // Add more if needed
];

const Filters = ({ genre, setGenre, year, setYear, rating, setRating }) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
      {/* Genre Filter */}
      <FormControl fullWidth sx={{ minWidth: 120 }}>
        <InputLabel>Genre</InputLabel>
        <Select value={genre} onChange={(e) => setGenre(e.target.value)} label="Genre">
          <MenuItem value="">All</MenuItem>
          {genres.map((g) => (
            <MenuItem key={g.id} value={g.id}>
              {g.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Year Filter */}
      <FormControl fullWidth sx={{ minWidth: 120 }}>
        <InputLabel>Year</InputLabel>
        <Select value={year} onChange={(e) => setYear(e.target.value)} label="Year">
          <MenuItem value="">All</MenuItem>
          {years.map((yr) => (
            <MenuItem key={yr} value={yr}>
              {yr}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Rating Filter */}
      <FormControl fullWidth sx={{ minWidth: 120 }}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) => setRating(e.target.value)} label="Rating">
          <MenuItem value="">All</MenuItem>
          {[9, 8, 7, 6, 5].map((r) => (
            <MenuItem key={r} value={r}>
              {r}+
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
