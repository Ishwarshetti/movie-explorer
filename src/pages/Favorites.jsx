
// Displays a list of user's favorite movies stored in localStorage
import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  // Remove a movie from favorites
  const handleRemoveFavorite = (movieId) => {
    const updated = favorites.filter((movie) => movie.id !== movieId);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        ❤️ Your Favorite Movies
      </Typography>

      {favorites.length === 0 ? (
        <Typography textAlign="center">No favorites yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard
                movie={movie}
                onRemoveFavorite={handleRemoveFavorite}
                isFavoritePage={true}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
