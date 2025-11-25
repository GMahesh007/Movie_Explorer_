import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHeart, FiCalendar, FiClock, FiGlobe, FiAward, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getMovieById } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getMovieById(id);
        if (response.success) {
          setMovie(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleFavoriteClick = () => {
    if (movie) {
      toggleFavorite({
        imdbID: movie.imdbID,
        Title: movie.title,
        Year: movie.year,
        Poster: movie.poster,
        Type: movie.type
      });
    }
  };

  if (loading) {
    return (
      <div className="movie-detail-page">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-detail-page">
        <div className="container">
          <div className="error-container">
            <h2>⚠️ Error</h2>
            <p>{error}</p>
            <button onClick={() => navigate(-1)} className="btn btn-primary">
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const posterUrl = movie.poster || 'https://via.placeholder.com/400x600/333/fff?text=No+Poster';
  const favorite = isFavorite(movie.imdbID);

  return (
    <motion.div
      className="movie-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="movie-backdrop" style={{ backgroundImage: `url(${posterUrl})` }}></div>
      
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FiArrowLeft /> Back
        </button>

        <div className="movie-detail-content">
          <div className="movie-poster-section">
            <img src={posterUrl} alt={movie.title} className="movie-detail-poster" />
          </div>

          <div className="movie-detail-info">
            <div className="movie-header">
              <h1 className="movie-detail-title">{movie.title}</h1>
              <button
                className={`favorite-btn-large ${favorite ? 'active' : ''}`}
                onClick={handleFavoriteClick}
              >
                <FiHeart fill={favorite ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="movie-meta-info">
              <span className="meta-item">
                <FiCalendar />
                {movie.year}
              </span>
              <span className="meta-item">
                <FiClock />
                {movie.runtime}
              </span>
              <span className="meta-item rated">{movie.rated}</span>
            </div>

            {movie.imdbRating && (
              <div className="movie-rating">
                <FiStar className="star-icon" />
                <span className="rating-value">{movie.imdbRating}</span>
                <span className="rating-max">/ 10</span>
                {movie.imdbVotes && (
                  <span className="rating-votes">({movie.imdbVotes} votes)</span>
                )}
              </div>
            )}

            <div className="movie-genres">
              {movie.genre?.split(', ').map((genre, index) => (
                <span key={index} className="genre-tag">{genre}</span>
              ))}
            </div>

            <div className="movie-plot">
              <h3>Plot</h3>
              <p>{movie.plot}</p>
            </div>

            <div className="movie-details-grid">
              {movie.director && movie.director !== 'N/A' && (
                <div className="detail-item">
                  <strong>Director:</strong>
                  <span>{movie.director}</span>
                </div>
              )}

              {movie.writer && movie.writer !== 'N/A' && (
                <div className="detail-item">
                  <strong>Writer:</strong>
                  <span>{movie.writer}</span>
                </div>
              )}

              {movie.actors && movie.actors !== 'N/A' && (
                <div className="detail-item">
                  <strong>Cast:</strong>
                  <span>{movie.actors}</span>
                </div>
              )}

              {movie.language && movie.language !== 'N/A' && (
                <div className="detail-item">
                  <strong><FiGlobe /> Language:</strong>
                  <span>{movie.language}</span>
                </div>
              )}

              {movie.country && movie.country !== 'N/A' && (
                <div className="detail-item">
                  <strong>Country:</strong>
                  <span>{movie.country}</span>
                </div>
              )}

              {movie.awards && movie.awards !== 'N/A' && (
                <div className="detail-item">
                  <strong><FiAward /> Awards:</strong>
                  <span>{movie.awards}</span>
                </div>
              )}

              {movie.boxOffice && (
                <div className="detail-item">
                  <strong>Box Office:</strong>
                  <span>{movie.boxOffice}</span>
                </div>
              )}
            </div>

            {movie.ratings && movie.ratings.length > 0 && (
              <div className="movie-ratings">
                <h3>Ratings</h3>
                <div className="ratings-grid">
                  {movie.ratings.map((rating, index) => (
                    <div key={index} className="rating-card">
                      <span className="rating-source">{rating.Source}</span>
                      <span className="rating-score">{rating.Value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieDetail;
