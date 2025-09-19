import React from 'react';
import '../styles/LoadingSkeleton.css';

const LoadingSkeleton = ({ type }) => {
  if (type === 'table') {
    return (
      <div className="skeleton-table">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="skeleton-row">
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (type === 'highlight') {
    return (
      <div className="skeleton-highlight">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="skeleton-item">
            <div className="skeleton-image"></div>
            <div className="skeleton-text">
              <div className="skeleton-line short"></div>
              <div className="skeleton-line shorter"></div>
            </div>
            <div className="skeleton-percent"></div>
          </div>
        ))}
      </div>
    );
  }
  
  return <div className="skeleton-default"></div>;
};

export default LoadingSkeleton;