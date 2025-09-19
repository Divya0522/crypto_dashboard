import React from 'react';
import { formatPercentage } from '../utils/formatters';
import '../styles/TopGainers.css';

const TopGainers = ({ coins }) => {
  return (
    <div className="top-gainers">
      {coins.slice(0, 3).map((coin, index) => (
        <div key={coin.item.id} className="gainer-card">
          <div className="gainer-rank">{index + 1}</div>
          <div className="gainer-info">
            <img src={coin.item.thumb} alt={coin.item.name} />
            <div>
              <div className="gainer-name">{coin.item.name}</div>
              <div className="gainer-symbol">{coin.item.symbol}</div>
            </div>
          </div>
          <div className="gainer-change positive">
            {formatPercentage(coin.item.data.price_change_percentage_24h?.usd || 0)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopGainers;