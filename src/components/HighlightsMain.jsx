import React, { useState, useEffect } from 'react';
import { getTrendingCoins } from '../services/api';
import '../styles/HighlightsMain.css';

const HighlightsMain = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getTrendingCoins();
        setTrendingCoins(response.data.coins.slice(0, 7));
      } catch (err) {
        console.error('Error fetching trending coins:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = [
    'All', 'Highlights', 'Categories', '🔥 Governance', 
    '🔥 Automated Market Maker (AMM)', '🔥 Alleged SEC Securities', '🔥 Trending Coins'
  ];

  const formatCoinData = (coins) => {
    return coins.map(coin => ({
      id: coin.item.id,
      name: coin.item.name,
      symbol: coin.item.symbol.toUpperCase(),
      thumb: coin.item.thumb,
      price: coin.item.data.price ? `$${parseFloat(coin.item.data.price).toFixed(4)}` : '$0.0000',
      change: coin.item.data.price_change_percentage_24h?.usd ? 
        `${coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%` : '0.00%',
    }));
  };

  const HighlightCard = ({ title, data, showMore = true, type = 'default' }) => (
    <div className="highlight-card">
      <div className="highlight-card-header">
        <h3>{title}</h3>
        {showMore && <a href="#more" className="view-more">more</a>}
      </div>
      <div className="highlight-card-content">
        {data.map((item, index) => (
          <div key={item.id || index} className="highlight-item">
            <div className="coin-info">
              <img src={item.thumb} alt={item.name} className="coin-thumb" />
              <div className="coin-text">
                <div className="coin-name">{item.name}</div>
                <div className="coin-symbol">{item.symbol}</div>
              </div>
            </div>
            <div className="coin-data">
              <div className="coin-price-data">
                <div className="coin-price">{item.price}</div>
                <div className={`coin-change ${item.change.includes('-') ? 'negative' : 'positive'}`}>
                  {item.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="highlights-main">
        <div className="loading-state">Loading highlights...</div>
      </div>
    );
  }

  const trendingData = formatCoinData(trendingCoins);
  const topGainersData = formatCoinData(trendingCoins);
  const topLosersData = formatCoinData(trendingCoins).map(coin => ({
    ...coin,
    change: `-${(Math.random() * 50).toFixed(2)}%`
  }));
  const newCoinsData = formatCoinData(trendingCoins.slice(0, 4));
  const mostViewedData = formatCoinData(trendingCoins.slice(0, 4));

  return (
    <div className="highlights-main">
      <div className="highlights-header">
        <h1>Crypto Highlights</h1>
        <p>Which cryptocurrencies are people more interested in? Track and discover the most interesting cryptocurrencies based on market and CoinGecko activity.</p>
      </div>

      <div className="highlights-categories">
        {categories.map(category => (
          <button 
            key={category}
            className={activeCategory === category.toLowerCase() ? 'active' : ''}
            onClick={() => setActiveCategory(category.toLowerCase())}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="highlights-grid">
        <div className="highlight-column">
          <HighlightCard title="🔥 Trending" data={trendingData} />
          <HighlightCard title="🚀 Top Gainers" data={topGainersData} />
        </div>
        
        <div className="highlight-column">
          <HighlightCard title="🚨 Top Losers" data={topLosersData} type="losers" />
          <HighlightCard title="✨ New Coins" data={newCoinsData} />
        </div>
        
        <div className="highlight-column">
          <HighlightCard title="👀 Most Viewed" data={mostViewedData} />
          <div className="highlight-card">
            <div className="highlight-card-header">
              <h3>🔓 Incoming Token Unlocks</h3>
              <a href="#more" className="view-more">more</a>
            </div>
            <div className="unlocks-content">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="unlock-item">
                  <div className="unlock-info">
                    <div className="unlock-name">Project {i}</div>
                    <div className="unlock-date">2024-03-15</div>
                  </div>
                  <div className="unlock-timer">
                    <span className="timer-days">2D</span>
                    <span className="timer-hours">12H</span>
                    <span className="timer-minutes">45M</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="trading-section">
        <h2>Trading Coins</h2>
        <div className="trading-coins-list">
          {['Linea', 'Solana', 'Pump.fun', 'Hyperliquid', 'OpenVPP', 'MYK Finance', 'Pudgy Penguins', 'World Liberty Financial'].map(coin => (
            <span key={coin} className="trading-coin">{coin}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightsMain;