import React from 'react';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { motion } from 'framer-motion';
import './Favorites.css';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="container">
          <h1 className="page-title">
            <FiHeart /> My Favorites
          </h1>
          
          <div className="empty-favorites">
            <FiHeart className="empty-icon" />
            <h2>No Favorites Yet</h2>
            <p>Start adding movies to your favorites list</p>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Browse Movies
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-header">
          <h1 className="page-title">
            <FiHeart /> My Favorites
          </h1>
          <p className="favorites-count">{favorites.length} movie{favorites.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="favorites-grid">
          {favorites.map((movie, index) => (
            <motion.div
              key={movie.imdbID}
              className="favorite-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div 
                className="favorite-poster-wrapper"
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
              >
                <img
                  src={movie.Poster && movie.Poster !== 'N/A' 
                    ? movie.Poster 
                    : 'https://via.placeholder.com/300x450/333/fff?text=No+Poster'}
                  alt={movie.Title}
                  className="favorite-poster"
                  loading="lazy"
                />
                <div className="favorite-overlay">
                  <span className="view-details">View Details</span>
                </div>
              </div>

              <div className="favorite-info">
                <h3 
                  className="favorite-title"
                  onClick={() => navigate(`/movie/${movie.imdbID}`)}
                >
                  {movie.Title}
                </h3>
                <div className="favorite-meta">
                  <span className="favorite-year">{movie.Year}</span>
                  <span className="favorite-type">{movie.Type}</span>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFavorite(movie.imdbID)}
                  aria-label="Remove from favorites"
                >
                  <FiTrash2 />
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
