
// Home page to search, filter, and view movies fetched from TMDb API
import React, { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import MovieCard from "../components/MovieCard";
import LoadMoreButton from "../components/LoadMoreButton";
import { fetchMovies } from "../utils/api";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  // Fetch movies on page/filters change
  const getMovies = async (q = query, p = page) => {
    try {
      const data = await fetchMovies(q, p, genre, year, rating);
      setMovies((prev) => (p === 1 ? data : [...prev, ...data]));
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, [page, genre, year, rating]);

  // Handle search bar input
  const handleSearch = (q) => {
    setQuery(q);
    setPage(1);
    getMovies(q, 1);
  };

  // Add a movie to localStorage favorites
  const handleAddToFavorites = (movie) => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!saved.find((m) => m.id === movie.id)) {
      saved.push(movie);
      localStorage.setItem("favorites", JSON.stringify(saved));
      alert("Added to favorites!");
    } else {
      alert("Already in favorites");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        🎬 Discover Movies
      </Typography>

      <SearchBar onSearch={handleSearch} />

      <Filters
        genre={genre}
        setGenre={setGenre}
        year={year}
        setYear={setYear}
        rating={rating}
        setRating={setRating}
      />

      <Grid container spacing={3} mt={1}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} onFavorite={handleAddToFavorites} />
          </Grid>
        ))}
      </Grid>

      {movies.length > 0 && (
        <Box textAlign="center" mt={2}>
          <LoadMoreButton onClick={() => setPage((prev) => prev + 1)} />
        </Box>
      )}
    </Container>
  );
};

export default Home;
