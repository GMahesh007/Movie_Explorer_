import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiCalendar, FiFilm } from 'react-icons/fi';
import { useFavorites } from '../hooks/useFavorites';
import { motion } from 'framer-motion';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.imdbID);

  const handleCardClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite({
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Type: movie.Type
    });
  };

  const posterUrl = movie.Poster && movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450/333/fff?text=No+Poster';

  return (
    <motion.div
      className="movie-card"
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="movie-poster-wrapper">
        <img 
          src={posterUrl} 
          alt={movie.Title}
          className="movie-poster"
          loading="lazy"
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiHeart fill={favorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        
        <div className="movie-meta">
          <span className="movie-year">
            <FiCalendar />
            {movie.Year}
          </span>
          <span className="movie-type">
            <FiFilm />
            {movie.Type}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
