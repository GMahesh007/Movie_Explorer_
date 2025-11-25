## Quick Start Guide

### 1. Get Your OMDB API Key
Visit https://www.omdbapi.com/apikey.aspx and get a free API key.

### 2. Setup Backend
```bash
cd backend
npm install
copy .env.example .env
# Edit .env and add your API key:
# OMDB_API_KEY=your_key_here
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Open Browser
Navigate to: http://localhost:3000

## Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify OMDB_API_KEY is set in .env
- Run `npm install` again

### Frontend won't start
- Check if port 3000 is available
- Verify backend is running on port 5000
- Run `npm install` again
- Clear browser cache

### Movies not loading
- Verify your OMDB API key is valid
- Check backend logs for errors
- Ensure internet connection is stable

### Cache not working
- Check CACHE_TTL and CACHE_MAX_SIZE in .env
- For Redis: verify REDIS_URL and Redis server is running
- Check backend logs for cache errors

## Features to Try

1. **Search Movies**: Try "Inception", "The Matrix", "Avengers"
2. **Use Filters**: Filter by year (e.g., 2010) or type (movie/series)
3. **Add Favorites**: Click the heart icon on any movie
4. **View Details**: Click on a movie card for full details
5. **Pagination**: Navigate through multiple pages of results

## Production Deployment

### Backend
1. Set NODE_ENV=production in .env
2. Use Redis for caching (set USE_REDIS=true)
3. Configure FRONTEND_URL to your frontend domain
4. Deploy to Heroku, Railway, or similar

### Frontend
1. Update vite.config.js proxy to point to production backend
2. Run `npm run build`
3. Deploy dist/ folder to Vercel, Netlify, or similar

## API Endpoints Quick Reference

- `GET /api/movies/search?title=inception` - Search movies
- `GET /api/movies/tt1375666` - Get movie by IMDb ID
- `GET /api/movies/title/Inception` - Get movie by exact title
- `GET /health` - Health check

## Support

Found a bug or have a question? Please open an issue on GitHub.
