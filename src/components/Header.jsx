import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="coingecko-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src="https://static.coingecko.com/s/coingecko-logo-8903d34ce19ca4be1c81f0db30e924154750d208683fad7ae6f2ce06c76d0a56.png" alt="CoinGecko" />
          </Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Cryptocurrencies</Link></li>
            <li><Link to="/highlights" className={location.pathname === '/highlights' ? 'active' : ''}>Highlights</Link></li>
            <li><a href="#news">News</a></li>
            <li><a href="#nft">NFT</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="search-btn">
            <i className="fas fa-search"></i>
          </button>
          <button className="theme-toggle">
            <i className="fas fa-moon"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;