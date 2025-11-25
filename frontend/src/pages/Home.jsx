import React, { useState } from 'react';
import { FiFilm } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';
import { searchMovies } from '../services/api';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [currentFilters, setCurrentFilters] = useState({});

  const handleSearch = async (query, filters, page = 1) => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);
    setCurrentFilters(filters);
    setCurrentPage(page);

    try {
      const response = await searchMovies(query, page, filters);
      
      if (response.success) {
        setMovies(response.data.movies);
        setTotalPages(response.data.totalPages);
        setTotalResults(response.data.totalResults);
      }
    } catch (err) {
      setError(err.message);
      setMovies([]);
      setTotalPages(0);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    handleSearch(searchQuery, currentFilters, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="hero-section">
          <div className="hero-icon">
            <FiFilm />
          </div>
          <h1 className="hero-title">Discover Movies & Series</h1>
          <p className="hero-subtitle">
            Search through millions of movies and TV shows from the OMDB database
          </p>
        </div>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
          </div>
        )}

        {!loading && !error && movies.length === 0 && searchQuery && (
          <div className="no-results">
            <FiFilm className="no-results-icon" />
            <h2>No results found</h2>
            <p>Try searching with different keywords</p>
          </div>
        )}

        {!loading && !error && movies.length === 0 && !searchQuery && (
          <div className="welcome-message">
            <FiFilm className="welcome-icon" />
            <h2>Start Your Journey</h2>
            <p>Search for your favorite movies and TV series</p>
            <div className="suggestions">
              <h3>Popular searches:</h3>
              <div className="suggestion-tags">
                <button onClick={() => handleSearch('Inception', {})}>Inception</button>
                <button onClick={() => handleSearch('The Matrix', {})}>The Matrix</button>
                <button onClick={() => handleSearch('Breaking Bad', {})}>Breaking Bad</button>
                <button onClick={() => handleSearch('Interstellar', {})}>Interstellar</button>
              </div>
            </div>
          </div>
        )}

        {totalResults > 0 && (
          <div className="results-info">
            <p>Found <strong>{totalResults}</strong> results for "<strong>{searchQuery}</strong>"</p>
          </div>
        )}

        <MovieGrid movies={movies} loading={loading} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
