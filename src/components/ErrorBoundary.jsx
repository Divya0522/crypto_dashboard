import React from 'react';
import '../styles/ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h2>Something went wrong.</h2>
            <p>We apologize for the inconvenience. Please try reloading the page.</p>
            <details className="error-details">
              <summary>Error Details</summary>
              <p className="error-message">
                {this.state.error ? this.state.error.toString() : 'Unknown error'}
              </p>
              {this.state.errorInfo && this.state.errorInfo.componentStack && (
                <pre className="error-stack">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </details>
            <button onClick={() => window.location.reload()} className="reload-btn">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    
    return this.props.children;
  }
}

export default ErrorBoundary;