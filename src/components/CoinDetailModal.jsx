import React from 'react';
import { formatCurrency, formatPercentage, formatNumber } from '../utils/formatters';
import '../styles/CoinDetailModal.css';

const CoinDetailModal = ({ coin, isOpen, onClose }) => {
  if (!isOpen || !coin) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="modal-header">
          <img src={coin.image} alt={coin.name} className="modal-coin-icon" />
          <div className="modal-coin-info">
            <h2>{coin.name}</h2>
            <p className="modal-coin-symbol">{coin.symbol.toUpperCase()}</p>
          </div>
          <span className={`modal-price-change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
            {formatPercentage(coin.price_change_percentage_24h)}
          </span>
        </div>

        <div className="modal-body">
          <div className="modal-stats">
            <div className="stat-item">
              <span className="stat-label">Current Price</span>
              <span className="stat-value">${formatNumber(coin.current_price)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Market Cap</span>
              <span className="stat-value">{formatCurrency(coin.market_cap)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">24h Trading Volume</span>
              <span className="stat-value">{formatCurrency(coin.total_volume)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">24h Low/High</span>
              <span className="stat-value">
                ${formatNumber(coin.low_24h)} / ${formatNumber(coin.high_24h)}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Circulating Supply</span>
              <span className="stat-value">
                {coin.circulating_supply ? formatNumber(coin.circulating_supply) + ' ' + coin.symbol.toUpperCase() : 'N/A'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Supply</span>
              <span className="stat-value">
                {coin.total_supply ? formatNumber(coin.total_supply) + ' ' + coin.symbol.toUpperCase() : 'N/A'}
              </span>
            </div>
          </div>

          <div className="modal-price-changes">
            <h3>Price Changes</h3>
            <div className="price-change-grid">
              <div className="change-item">
                <span>1h</span>
                <span className={coin.price_change_percentage_1h_in_currency >= 0 ? 'positive' : 'negative'}>
                  {formatPercentage(coin.price_change_percentage_1h_in_currency)}
                </span>
              </div>
              <div className="change-item">
                <span>24h</span>
                <span className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                  {formatPercentage(coin.price_change_percentage_24h)}
                </span>
              </div>
              <div className="change-item">
                <span>7d</span>
                <span className={coin.price_change_percentage_7d_in_currency >= 0 ? 'positive' : 'negative'}>
                  {formatPercentage(coin.price_change_percentage_7d_in_currency)}
                </span>
              </div>
              <div className="change-item">
                <span>14d</span>
                <span className={coin.price_change_percentage_14d_in_currency >= 0 ? 'positive' : 'negative'}>
                  {formatPercentage(coin.price_change_percentage_14d_in_currency)}
                </span>
              </div>
              <div className="change-item">
                <span>30d</span>
                <span className={coin.price_change_percentage_30d_in_currency >= 0 ? 'positive' : 'negative'}>
                  {formatPercentage(coin.price_change_percentage_30d_in_currency)}
                </span>
              </div>
              <div className="change-item">
                <span>1y</span>
                <span className={coin.price_change_percentage_1y_in_currency >= 0 ? 'positive' : 'negative'}>
                  {formatPercentage(coin.price_change_percentage_1y_in_currency)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="buy-button">Buy {coin.symbol.toUpperCase()}</button>
          <div className="external-links">
            <a 
              href={`https://www.coingecko.com/en/coins/${coin.id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="external-link"
            >
              View on CoinGecko
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetailModal;