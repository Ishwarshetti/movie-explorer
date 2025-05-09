// Detailed movie page that shows movie overview, genre buttons, trailer video, and an "Add to Favorites" button
// Uses movie ID from route params and fetches details and trailer from TMDb API


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "a365e947e1458214b9977962a4fc4b26";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [detailsRes, videoRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`),
        ]);

        setMovie(detailsRes.data);

        const trailers = videoRes.data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch movie details or trailer:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading || !movie) {
    return (
      <Container sx={{ mt: 4 }} textAlign="center">
        <Typography variant="h4">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        {movie.title} ({movie.release_date.split("-")[0]})
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>Overview</Typography>
          <Typography>{movie.overview}</Typography>

          <Box mt={2}>
            <Typography variant="h6">Genres:</Typography>
            <Box>
              {movie.genres.map((genre) => (
                <Button
                  key={genre.id}
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 1, mb: 1 }}
                >
                  {genre.name}
                </Button>
              ))}
            </Box>
          </Box>

          <Box mt={2}>
            <Typography variant="h6">Rating:</Typography>
            <Typography>{movie.vote_average} / 10</Typography>
          </Box>

          <Box mt={2}>
            <Typography variant="h6">Release Date:</Typography>
            <Typography>{movie.release_date}</Typography>
          </Box>

          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const saved = JSON.parse(localStorage.getItem("favorites")) || [];
                if (!saved.some((m) => m.id === movie.id)) {
                  saved.push(movie);
                  localStorage.setItem("favorites", JSON.stringify(saved));
                  alert("Movie added to favorites!");
                } else {
                  alert("Movie already in favorites.");
                }
              }}
            >
              Add to Favorites
            </Button>
          </Box>
        </Grid>
      </Grid>

      {trailerKey && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom>
            Watch Trailer
          </Typography>
          <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "8px"
              }}
            ></iframe>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default MovieDetails;
