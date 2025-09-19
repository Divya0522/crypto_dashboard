import React, { useState, useEffect } from 'react';
import { getGlobalMarketData, getCoinMarkets, getTrendingCoins } from '../services/api';
import MarketStats from '../components/MarketStats';
import CryptoTable from '../components/CryptoTable';
import '../styles/Home.css';

const Home = () => {
  const [globalData, setGlobalData] = useState(null);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [globalResponse, coinsResponse] = await Promise.all([
          getGlobalMarketData(),
          getCoinMarkets({ per_page: 100 })
        ]);
        
        setGlobalData(globalResponse.data.data);
        setCoins(coinsResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <div className="page-header">
        <h1>Cryptocurrency Prices by Market Cap</h1>
        <p>
          The global cryptocurrency market cap is <strong>${globalData?.total_market_cap?.usd?.toLocaleString()}</strong>, 
          a <strong className={globalData?.market_cap_change_percentage_24h_usd >= 0 ? 'positive' : 'negative'}>
            {globalData?.market_cap_change_percentage_24h_usd?.toFixed(2)}%
          </strong> change in the last 24 hours.
        </p>
      </div>

      <MarketStats globalData={globalData} />
      
      <div className="content-filters">
        <div className="filter-buttons">
          <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>All</button>
          <button className={activeTab === 'highlights' ? 'active' : ''} onClick={() => setActiveTab('highlights')}>Highlights</button>
          <button className={activeTab === 'categories' ? 'active' : ''} onClick={() => setActiveTab('categories')}>Categories</button>
          <button>Energy</button>
          <button>Binance Wallet IDD</button>
          <button>Launchpad</button>
        </div>
      </div>

      {activeTab === 'all' && <CryptoTable coins={coins} loading={loading} />}
      {activeTab === 'highlights' && (
        <div className="highlights-placeholder">
          <p>Switch to the Highlights tab for detailed crypto highlights</p>
        </div>
      )}
      {activeTab === 'categories' && (
        <div className="categories-placeholder">
          <p>Categories content will be displayed here</p>
        </div>
      )}
    </div>
  );
};

export default Home;