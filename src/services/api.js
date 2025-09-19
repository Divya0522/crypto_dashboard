import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY || '';

const cache = new Map();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: API_KEY ? { 'x-cg-demo-api-key': API_KEY } : {},
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`Received response from: ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response) {
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      
  
      if (error.response.status === 429) {
        console.warn('Rate limit exceeded. Please add your API key to .env file.');
      }
    }
    return Promise.reject(error);
  }
);

const fetchWithRetry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error.response?.status !== 404) {
      console.log(`Retrying request... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export const getCoinMarkets = (params) => {
  const cacheKey = `markets-${JSON.stringify(params)}`;
  

  if (cache.has(cacheKey)) {
    const cachedData = cache.get(cacheKey);
    if (Date.now() - cachedData.timestamp < 30000) {
      console.log('Returning cached data for markets');
      return Promise.resolve(cachedData.data);
    }
  }
  
  const apiCall = () => api.get('/coins/markets', { 
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 100,
      page: 1,
      price_change_percentage: '1h,24h,7d',
      sparkline: true,
      ...params
    }
  });
  
  return fetchWithRetry(apiCall).then(response => {

    cache.set(cacheKey, {
      data: response,
      timestamp: Date.now()
    });
    
    return response;
  });
};

export const getTrendingCoins = () => {
  const cacheKey = 'trending';
  
  if (cache.has(cacheKey)) {
    const cachedData = cache.get(cacheKey);
    if (Date.now() - cachedData.timestamp < 60000) { 
      console.log('Returning cached data for trending');
      return Promise.resolve(cachedData.data);
    }
  }
  
  const apiCall = () => api.get('/search/trending');
  
  return fetchWithRetry(apiCall).then(response => {
    cache.set(cacheKey, {
      data: response,
      timestamp: Date.now()
    });
    
    return response;
  });
};

export const getGlobalMarketData = () => {
  const cacheKey = 'global';
  
  if (cache.has(cacheKey)) {
    const cachedData = cache.get(cacheKey);
    if (Date.now() - cachedData.timestamp < 60000) { 
      console.log('Returning cached data for global');
      return Promise.resolve(cachedData.data);
    }
  }
  
  const apiCall = () => api.get('/global');
  
  return fetchWithRetry(apiCall).then(response => {
    cache.set(cacheKey, {
      data: response,
      timestamp: Date.now()
    });
    
    return response;
  });
};

export const getCoinDetails = (id) => {
  const cacheKey = `coin-${id}`;
  
  if (cache.has(cacheKey)) {
    const cachedData = cache.get(cacheKey);
    if (Date.now() - cachedData.timestamp < 30000) { 
      console.log('Returning cached data for coin details');
      return Promise.resolve(cachedData.data);
    }
  }
  
  const apiCall = () => api.get(`/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false
    }
  });
  
  return fetchWithRetry(apiCall).then(response => {
    cache.set(cacheKey, {
      data: response,
      timestamp: Date.now()
    });
    
    return response;
  });
};


export const clearCache = () => {
  cache.clear();
  console.log('API cache cleared');
};

export default api;