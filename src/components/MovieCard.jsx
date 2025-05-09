// Component to display a single movie card with poster, title, rating, release year
// Includes buttons for viewing details, trailer, and adding/removing from favorites
// If `isFavoritePage` is true, shows "Remove" instead of "Favorite"


import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieCard = ({ movie, onFavorite, onRemoveFavorite, isFavoritePage }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const API_KEY = "a365e947e1458214b9977962a4fc4b26";

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
        );
        const trailers = response.data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
  }, [movie.id]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="500"
        image={posterUrl}
        alt={movie.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Release Year: {movie.release_date?.split("-")[0] || "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {movie.vote_average || "N/A"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          to={`/movie/${movie.id}`}
        >
          Details
        </Button>

        {trailerKey && (
          <Button
            size="small"
            color="secondary"
            onClick={() => window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank")}
          >
            Watch Trailer
          </Button>
        )}

        {isFavoritePage ? (
          <Button
            size="small"
            color="error"
            onClick={() => onRemoveFavorite(movie.id)}
          >
            Remove
          </Button>
        ) : (
          <Button
            size="small"
            onClick={() => onFavorite(movie)}
          >
            Favorite
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default MovieCard;
