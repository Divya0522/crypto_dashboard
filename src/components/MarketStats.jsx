import React from 'react';
import Sparkline from './Sparkline';
import '../styles/MarketStats.css';

const MarketStats = ({ globalData }) => {
  const formatNumber = (num) => {
    if (!num) return '$0';
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const marketCapSparkline = [4150, 4180, 4200, 4170, 4180, 4180.15];
  const volumeSparkline = [145, 148, 150, 147, 148, 148.51];
  const btcDominanceSparkline = [55.0, 55.3, 55.5, 55.7, 55.6, 55.7];

  return (
    <div className="market-stats">
      <div className="stat-card market-cap">
        <div className="stat-main">
          <div className="stat-value">{formatNumber(globalData?.total_market_cap?.usd)}</div>
          <div className="stat-label">Market Cap</div>
          <div className={`stat-change ${globalData?.market_cap_change_percentage_24h_usd >= 0 ? 'positive' : 'negative'}`}>
            {globalData?.market_cap_change_percentage_24h_usd?.toFixed(2)}%
          </div>
        </div>
        <div className="stat-sparkline">
          <Sparkline prices={marketCapSparkline} width={120} height={40} />
        </div>
      </div>
      
      <div className="stat-card volume">
        <div className="stat-main">
          <div className="stat-value">{formatNumber(globalData?.total_volume?.usd)}</div>
          <div className="stat-label">24h Trading Volume</div>
          <div className="stat-change positive">
            {globalData?.market_cap_change_percentage_24h_usd?.toFixed(2)}%
          </div>
        </div>
        <div className="stat-sparkline">
          <Sparkline prices={volumeSparkline} width={120} height={40} />
        </div>
      </div>
      
      <div className="stat-card btc-dominance">
        <div className="stat-main">
          <div className="stat-value">{globalData?.market_cap_percentage?.btc?.toFixed(1)}%</div>
          <div className="stat-label">BTC Dominance</div>
          <div className="stat-change positive">
            +0.5%
          </div>
        </div>
        <div className="stat-sparkline">
          <Sparkline prices={btcDominanceSparkline} width={120} height={40} />
        </div>
      </div>
    </div>
  );
};

export default MarketStats;