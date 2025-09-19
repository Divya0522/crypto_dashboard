import React from 'react';
import { formatPercentage } from '../utils/formatters';
import '../styles/TrendingCoins.css';

const TrendingCoins = ({ coins }) => {
  return (
    <div className="trending-coins">
      {coins.slice(0, 5).map((coin, index) => (
        <div key={coin.item.id} className="trending-card">
          <div className="trending-rank">{index + 1}</div>
          <div className="trending-info">
            <img src={coin.item.thumb} alt={coin.item.name} />
            <div>
              <div className="trending-name">{coin.item.name}</div>
              <div className="trending-symbol">{coin.item.symbol}</div>
            </div>
          </div>
          <div className="trending-score">
            <span className="score-label">Score:</span>
            <span className="score-value">{coin.item.score}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingCoins;