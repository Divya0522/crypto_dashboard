import React, { useState, useEffect } from 'react';
import { getTrendingCoins, getGlobalMarketData } from '../services/api';
import { formatPercentage } from '../utils/formatters';
import TopGainers from './TopGainers';
import TrendingCoins from './TrendingCoins';
import LoadingSkeleton from './LoadingSkeleton';
import '../styles/HighlightsSection.css';

const HighlightsSection = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [globalData, setGlobalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('gainers');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [trendingResponse, globalResponse] = await Promise.all([
          getTrendingCoins(),
          getGlobalMarketData()
        ]);
        
        setTrendingCoins(trendingResponse.data.coins);
        setGlobalData(globalResponse.data.data);
      } catch (err) {
        console.error('Error fetching highlights data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="highlights-section">
      <div className="highlights-header">
        <h1>Crypto Highlights</h1>
        <p>Which cryptocurrencies are people more interested in? Track and discover the most interesting cryptocurrencies based on market and CoinGecko activity.</p>
      </div>

      <div className="highlights-tabs">
        <button 
          className={activeTab === 'gainers' ? 'active' : ''}
          onClick={() => setActiveTab('gainers')}
        >
          Top Gainers
        </button>
        <button 
          className={activeTab === 'trending' ? 'active' : ''}
          onClick={() => setActiveTab('trending')}
        >
          Trending
        </button>
        <button 
          className={activeTab === 'categories' ? 'active' : ''}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
      </div>

      <div className="highlights-content">
        {activeTab === 'gainers' && (
          <div className="tab-content">
            {loading ? <LoadingSkeleton type="highlight" /> : <TopGainers coins={trendingCoins} />}
          </div>
        )}

        {activeTab === 'trending' && (
          <div className="tab-content">
            {loading ? <LoadingSkeleton type="highlight" /> : <TrendingCoins coins={trendingCoins} />}
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="tab-content">
            <div className="categories-grid">
              <div className="category-card">
                <h3>DeFi</h3>
                <p>Decentralized Finance</p>
              </div>
              <div className="category-card">
                <h3>NFT</h3>
                <p>Non-Fungible Tokens</p>
              </div>
              <div className="category-card">
                <h3>Gaming</h3>
                <p>Blockchain Games</p>
              </div>
              <div className="category-card">
                <h3>Layer 1</h3>
                <p>Base Protocols</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="trading-coins-section">
        <h2>Trading Coins</h2>
        <div className="trading-coins-list">
          <span>Linea</span>
          <span>Solana</span>
          <span>Pump.fun</span>
          <span>Hyperliquid</span>
          <span>OpenVPP</span>
          <span>MYK Finance</span>
          <span>Pudgy Penguins</span>
          <span>World Liberty Financial</span>
        </div>
      </div>
    </div>
  );
};

export default HighlightsSection;