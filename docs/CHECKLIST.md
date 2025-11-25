# 🚀 Quick Setup Checklist

Follow this checklist to get your OMDB Movie Explorer up and running!

## ✅ Pre-Setup

- [ ] Node.js v16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Got OMDB API Key from https://www.omdbapi.com/apikey.aspx

## 📦 Installation

### Option 1: Automatic Setup (Recommended)
- [ ] Run `setup.bat` (Windows) or `bash setup.sh` (Mac/Linux)
- [ ] Edit `backend\.env` and add your OMDB API key

### Option 2: Manual Setup
- [ ] `cd backend && npm install`
- [ ] Copy `backend\.env.example` to `backend\.env`
- [ ] Edit `backend\.env` and add your OMDB API key
- [ ] `cd ../frontend && npm install`

## ⚙️ Configuration

### Backend (.env file)
- [ ] `OMDB_API_KEY` = Your actual API key
- [ ] `PORT` = 5000 (or your preferred port)
- [ ] `NODE_ENV` = development
- [ ] `CACHE_TTL` = 3600 (1 hour)
- [ ] `USE_REDIS` = false (set to true if using Redis)

## 🏃 Running the Application

### Option 1: Using start.bat (Windows)
- [ ] Double-click `start.bat`
- [ ] Both servers will start automatically

### Option 2: Manual Start
Terminal 1 (Backend):
- [ ] `cd backend`
- [ ] `npm start` (or `npm run dev` for auto-reload)
- [ ] Verify: http://localhost:5000/health

Terminal 2 (Frontend):
- [ ] `cd frontend`
- [ ] `npm run dev`
- [ ] Verify: http://localhost:3000

## 🧪 Testing the Application

- [ ] Open http://localhost:3000 in browser
- [ ] Try searching for "Inception"
- [ ] Click on a movie to see details
- [ ] Add a movie to favorites (heart icon)
- [ ] Navigate to Favorites page
- [ ] Try filters (year, type)
- [ ] Test pagination (search for "Batman")
- [ ] Test on mobile (resize browser)

## 🐛 Troubleshooting

### Backend Issues

**Error: OMDB_API_KEY not set**
- [ ] Check `backend\.env` file exists
- [ ] Verify API key is added correctly
- [ ] Restart backend server

**Error: Port 5000 already in use**
- [ ] Change PORT in `.env` to different port (e.g., 5001)
- [ ] Update frontend proxy in `vite.config.js`

**Error: Module not found**
- [ ] Run `cd backend && npm install` again
- [ ] Delete `node_modules` and reinstall

### Frontend Issues

**Error: Port 3000 already in use**
- [ ] Stop other applications using port 3000
- [ ] Or change port in `vite.config.js`

**Movies not loading**
- [ ] Check backend is running (http://localhost:5000/health)
- [ ] Check browser console for errors
- [ ] Verify API key is valid

**Build errors**
- [ ] Run `cd frontend && npm install` again
- [ ] Clear npm cache: `npm cache clean --force`
- [ ] Delete `node_modules` and reinstall

## 📊 Verify Everything Works

### Backend Tests
- [ ] Health check: http://localhost:5000/health
- [ ] Search: http://localhost:5000/api/movies/search?title=inception
- [ ] Movie detail: http://localhost:5000/api/movies/tt1375666

### Frontend Tests
- [ ] Homepage loads
- [ ] Search works
- [ ] Movie cards display
- [ ] Pagination works
- [ ] Detail page loads
- [ ] Favorites work
- [ ] Responsive on mobile

## 🚀 Ready for Development!

You're all set! Here are some things to try:

### Backend Development
- [ ] Add new API endpoints
- [ ] Implement user authentication
- [ ] Add database integration
- [ ] Set up Redis caching

### Frontend Development
- [ ] Add new components
- [ ] Customize styling
- [ ] Add new features
- [ ] Improve animations

## 📚 Next Steps

- [ ] Read README.md for detailed documentation
- [ ] Check PROJECT_SUMMARY.md for architecture overview
- [ ] Review CONTRIBUTING.md for contribution guidelines
- [ ] Explore API endpoints
- [ ] Customize the UI

## 🎯 Production Checklist

When ready to deploy:

### Backend
- [ ] Set `NODE_ENV=production`
- [ ] Use Redis for caching (`USE_REDIS=true`)
- [ ] Set up SSL/TLS
- [ ] Configure CORS for production domain
- [ ] Set up monitoring and logging
- [ ] Run security audit: `npm audit`

### Frontend
- [ ] Build: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Update API URL for production
- [ ] Set up CDN (optional)
- [ ] Configure caching headers
- [ ] Run performance audit (Lighthouse)

## ✨ Tips for Success

1. **Start Simple:** Get basic search working first
2. **Test Often:** Test after each feature addition
3. **Read Errors:** Error messages are helpful!
4. **Use DevTools:** Browser and Node.js debugging tools
5. **Ask for Help:** Open GitHub issues if stuck

## 🎉 You're Done!

Enjoy exploring movies with your new OMDB Explorer!

**Happy Coding! 🚀**

---

## Quick Reference

**Backend:**
- URL: http://localhost:5000
- Health: http://localhost:5000/health
- API: http://localhost:5000/api/movies/*

**Frontend:**
- URL: http://localhost:3000
- Build: `npm run build`
- Dev: `npm run dev`

**Useful Commands:**
```bash
# Backend
cd backend
npm start          # Start server
npm run dev        # Start with auto-reload

# Frontend
cd frontend
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```
