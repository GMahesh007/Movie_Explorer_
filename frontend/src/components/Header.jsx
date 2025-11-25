import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiFilm, FiHeart } from 'react-icons/fi';
import { useFavorites } from '../hooks/useFavorites';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const { favorites } = useFavorites();

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <FiFilm className="logo-icon" />
          <span>OMDB Explorer</span>
        </Link>
        
        <nav className="nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/favorites" 
            className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
          >
            <FiHeart />
            Favorites
            {favorites.length > 0 && (
              <span className="badge">{favorites.length}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
