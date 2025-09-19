# Crypto Dashboard

A React-based cryptocurrency dashboard that displays market data from CoinGecko API.

## Features

- View all cryptocurrencies with market data
- Search and sort functionality
- Pagination with customizable rows per page
- Coin detail modal with comprehensive information
- Highlights section with trending coins, top gainers, and losers
- Responsive design that works on mobile and desktop
- Error handling and loading states
- API response caching for better performance

## Setup

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file in the root directory based on `.env.example`
4. Add your CoinGecko API key to `.env`:VITE_COINGECKO_API_KEY=your_api_key_here
5. Run `npm run dev`

## API Key

Get your free API key from [CoinGecko API](https://www.coingecko.com/api/documentation). The free tier allows up to 50 calls per minute.

## Design Patterns Used

- **Component Composition**: Reusable UI elements like LoadingSkeleton, Sparkline
- **Custom Hooks**: For debouncing search queries
- **Error Boundaries**: For graceful error handling
- **Adapter Pattern**: For API response mapping to component props
- **Caching Strategy**: Client-side caching of API responses to reduce calls
- **Retry Pattern**: Exponential backoff for failed API requests

## Performance Considerations

- Debounced search to reduce API calls while typing
- Client-side caching of API responses
- Pagination to limit rendered items
- React.memo and useMemo for preventing unnecessary re-renders
- Lazy loading of components where appropriate

## Project Structure

src/
components/ # Reusable UI components
pages/ # Page components
services/ # API services and configuration
styles/ # CSS stylesheets
utils/ # Utility functions and formatters


## Future Improvements

- Real-time updates with WebSockets for live pricing
- Advanced charting for coin details using a library like Chart.js
- Portfolio tracking functionality
- More comprehensive testing with Jest and React Testing Library
- Dark mode toggle
- Favorites/watchlist functionality
- Export data to CSV/PDF

## Limitations

- The free CoinGecko API has rate limits (50 calls/minute)
- Some data might be delayed by up to 5 minutes
- No user authentication or personalization

## Browser Support

This application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

