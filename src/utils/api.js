
// API utility to fetch movies from TMDb with optional filters
import axios from 'axios';

const API_KEY = 'a365e947e1458214b9977962a4fc4b26';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query = '', page = 1, genre = '', year = '', rating = '') => {
  try {
    let endpoint = '';

    // Use search endpoint if query exists, otherwise use popular endpoint
    if (query) {
      endpoint = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
    } else {
      endpoint = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
    }

    // Apply filters if present
    if (genre) endpoint += `&with_genres=${genre}`;
    if (year) endpoint += `&primary_release_year=${year}`;
    if (rating) endpoint += `&vote_average.gte=${rating}`;

    const response = await axios.get(endpoint);
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch movies", error);
    throw new Error('Failed to fetch movies');
  }
};
