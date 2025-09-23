import React, { useState, useEffect } from 'react';
import { getCoinMarkets } from '../services/api';
import { formatCurrency, formatPercentage, formatNumber } from '../utils/formatters';
import Sparkline from './Sparkline';
import LoadingSkeleton from './LoadingSkeleton';
import '../styles/CryptoTable.css';

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 100;

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const response = await getCoinMarkets({ 
          per_page: itemsPerPage,
          page: currentPage
        });
        setCoins(response.data);
        setTotalPages(Math.ceil(10000 / itemsPerPage)); 
        setError(null);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching coins:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); 
  };

  const filteredCoins = React.useMemo(() => {
    if (searchQuery) {
      return coins.filter(coin => 
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return coins;
  }, [coins, searchQuery]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    
    return (
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-arrow"
        >
          ←
        </button>
        
        {startPage > 1 && (
          <>
            <button onClick={() => handlePageChange(1)}>1</button>
            {startPage > 2 && <span className="pagination-ellipsis">...</span>}
          </>
        )}
        
        {pages}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
            <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
          </>
        )}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-arrow"
        >
          →
        </button>
      </div>
    );
  };

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="crypto-table-container">
      <div className="table-filters">
        <div className="table-search">
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <i className="fas fa-search"></i>
        </div>
      </div>

      <div className="table-responsive">
        <table className="crypto-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>1h</th>
              <th>24h</th>
              <th>7d</th>
              <th>24h Volume</th>
              <th>Market Cap</th>
              <th>Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filteredCoins.map(coin => (
              <tr key={coin.id} className="coin-row">
                <td>{coin.market_cap_rank}</td>
                <td className="coin-name">
                  <img src={coin.image} alt={coin.name} className="coin-icon" />
                  <div>
                    <div className="coin-symbol">{coin.symbol.toUpperCase()}</div>
                    <div className="coin-fullname">{coin.name}</div>
                  </div>
                  <button className="buy-button">Buy</button>
                </td>
                <td className="price">${formatNumber(coin.current_price)}</td>
                <td className={coin.price_change_percentage_1h_in_currency >= 0 ? 'positive' : 'negative'}>
                  {formatPercentage(coin.price_change_percentage_1h_in_currency)}
                </td>
                <td className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                  {formatPercentage(coin.price_change_percentage_24h)}
                </td>
                <td className={coin.price_change_percentage_7d_in_currency >= 0 ? 'positive' : 'negative'}>
                  {formatPercentage(coin.price_change_percentage_7d_in_currency)}
                </td>
                <td>{formatCurrency(coin.total_volume)}</td>
                <td>{formatCurrency(coin.market_cap)}</td>
                <td>
                  <Sparkline prices={coin.sparkline_in_7d?.price || []} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {loading && <LoadingSkeleton type="table" />}
        
        {!loading && filteredCoins.length === 0 && (
          <div className="empty-state">
            <p>No coins found matching your search.</p>
          </div>
        )}
      </div>

      {!loading && filteredCoins.length > 0 && (
        <div className="table-pagination">
          <span>Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCoins.length)} of ~10,000 results</span>
          {renderPagination()}
        </div>
      )}
    </div>
  );
};

export default CryptoTable;