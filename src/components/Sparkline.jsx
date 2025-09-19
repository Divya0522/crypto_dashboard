import React from 'react';
import '../styles/Sparkline.css';

const Sparkline = ({ prices, width = 100, height = 30, color = "#3861fb" }) => {
 
  if (!Array.isArray(prices) || prices.length < 2) {
    return (
      <div className="sparkline-container" style={{ width, height }}>
        <span className="no-data">No data</span>
      </div>
    );
  }

  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const range = maxPrice - minPrice || 1; 
 
  const points = prices.map((price, index) => {
    const x = (index / (prices.length - 1)) * (width - 4);
    const y = height - 4 - ((price - minPrice) / range) * (height - 8);
    return `${x + 2},${y + 2}`;
  }).join(' ');

  const isPositive = prices[prices.length - 1] >= prices[0];
  const lineColor = isPositive ? '#16c784' : '#ea3943';

  return (
    <div className="sparkline-container" style={{ width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <polyline
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    </div>
  );
};

export default Sparkline;