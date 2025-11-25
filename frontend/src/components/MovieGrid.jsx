import React from 'react';
import MovieCard from './MovieCard';
import './MovieGrid.css';

const MovieGrid = ({ movies, loading }) => {
  if (loading) {
    return (
      <div className="movie-grid">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="movie-card skeleton">
            <div className="skeleton-poster"></div>
            <div className="skeleton-info">
              <div className="skeleton-title"></div>
              <div className="skeleton-meta"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
