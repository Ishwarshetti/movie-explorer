# Movie Explorer

**Movie Explorer** is a web application built using **React** and **TMDb API**. It allows users to explore movies, search for specific titles, view detailed information about movies, add movies to favorites, and watch trailers. The application also supports features like filtering movies by genre, year, and rating.

## Features

- 🔍 Search for movies by title
- 🎞️ Watch trailers directly in the app
- ❤️ Add/remove movies from favorites
- 🎛️ Filter movies by genre, year, and rating
- 🧾 View detailed movie info (overview, release date, rating, genres)
- 🌗 Light/Dark theme toggle
- 📱 Responsive design for mobile/tablet/desktop

## Tech Stack

- **Frontend**: React, Material UI
- **API**: TMDb API
- **Routing**: React Router
- **State**: useState, useEffect, localStorage
- **Deployment**: Vercel / Netlify (recommended)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### 1. Clone the Repository

```bash
git clone https://gitlab.com/ishwarpattanashetty/movie-explorer.git
cd movie-explorer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup TMDb API Key

Create a `.env` file in the root directory and add your TMDb API key:

```env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
```

> ⚠️ You can get your API key by creating an account on [TMDb](https://www.themoviedb.org/settings/api).

### 4. Run the App

```bash
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
```

## Folder Structure

```
movie-explorer/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   ├── index.js
├── .env
├── package.json
├── README.md
```

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to your fork: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.
