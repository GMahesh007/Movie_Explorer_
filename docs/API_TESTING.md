# 🧪 API Testing Guide

This guide provides examples for testing the OMDB Movie Explorer API.

## Prerequisites

- Backend server running on http://localhost:5000
- OMDB API key configured in `.env`

## Testing Tools

You can use any of these tools:
- **Browser:** For GET requests
- **curl:** Command line tool
- **Postman:** GUI application
- **Thunder Client:** VS Code extension
- **Insomnia:** API testing tool

## 1. Health Check

### Test server is running

**Browser / curl:**
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45
}
```

## 2. Search Movies

### Basic Search

**curl:**
```bash
curl "http://localhost:5000/api/movies/search?title=inception"
```

**Browser:**
```
http://localhost:5000/api/movies/search?title=inception
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "movies": [
      {
        "Title": "Inception",
        "Year": "2010",
        "imdbID": "tt1375666",
        "Type": "movie",
        "Poster": "https://..."
      }
    ],
    "totalResults": 1,
    "page": 1,
    "totalPages": 1
  },
  "cached": false
}
```

### Search with Filters

**Search by year:**
```bash
curl "http://localhost:5000/api/movies/search?title=batman&year=2008"
```

**Search by type:**
```bash
curl "http://localhost:5000/api/movies/search?title=friends&type=series"
```

**Search with pagination:**
```bash
curl "http://localhost:5000/api/movies/search?title=star&page=2"
```

**Combined filters:**
```bash
curl "http://localhost:5000/api/movies/search?title=avengers&year=2012&type=movie&page=1"
```

### Error Cases

**Missing title:**
```bash
curl "http://localhost:5000/api/movies/search"
```

**Response:**
```json
{
  "success": false,
  "error": "Title parameter is required"
}
```

**No results:**
```bash
curl "http://localhost:5000/api/movies/search?title=xyzabc123notfound"
```

**Response:**
```json
{
  "success": false,
  "error": "Movie not found!"
}
```

## 3. Get Movie by IMDb ID

### Successful Request

**curl:**
```bash
curl "http://localhost:5000/api/movies/tt1375666"
```

**Browser:**
```
http://localhost:5000/api/movies/tt1375666
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "imdbID": "tt1375666",
    "title": "Inception",
    "year": "2010",
    "rated": "PG-13",
    "released": "16 Jul 2010",
    "runtime": "148 min",
    "genre": "Action, Sci-Fi, Thriller",
    "director": "Christopher Nolan",
    "writer": "Christopher Nolan",
    "actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
    "plot": "A thief who steals corporate secrets...",
    "language": "English, Japanese, French",
    "country": "USA, UK",
    "awards": "Won 4 Oscars. 152 wins & 220 nominations total",
    "poster": "https://...",
    "ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "87%"
      }
    ],
    "metascore": "74",
    "imdbRating": "8.8",
    "imdbVotes": "2,200,000",
    "type": "movie",
    "boxOffice": "$292,576,195"
  },
  "cached": false
}
```

### With Short Plot

**curl:**
```bash
curl "http://localhost:5000/api/movies/tt1375666?plot=short"
```

### Error Cases

**Invalid IMDb ID:**
```bash
curl "http://localhost:5000/api/movies/invalid123"
```

## 4. Get Movie by Title

### Exact Title Match

**curl:**
```bash
curl "http://localhost:5000/api/movies/title/Inception"
```

**Browser:**
```
http://localhost:5000/api/movies/title/Inception
```

### With Year Filter

**curl:**
```bash
curl "http://localhost:5000/api/movies/title/Batman?year=1989"
```

**Note:** Spaces in titles need URL encoding:
```bash
curl "http://localhost:5000/api/movies/title/The%20Matrix"
```

## 5. Testing Caching

### First Request (Not Cached)

```bash
curl "http://localhost:5000/api/movies/search?title=inception"
```

**Response includes:**
```json
{
  "cached": false
}
```

### Second Request (Cached)

Run same request again within TTL:
```bash
curl "http://localhost:5000/api/movies/search?title=inception"
```

**Response includes:**
```json
{
  "cached": true
}
```

**Note:** Cache expires after `CACHE_TTL` seconds (default: 3600)

## 6. Testing Rate Limiting

### Normal Usage

```bash
# First 100 requests within 15 minutes - OK
for i in {1..100}; do
  curl "http://localhost:5000/api/movies/search?title=test$i"
done
```

### Rate Limit Exceeded

```bash
# 101st request - Rate limited
curl "http://localhost:5000/api/movies/search?title=test"
```

**Response:**
```json
{
  "success": false,
  "error": "Too many requests from this IP, please try again later."
}
```

**HTTP Status:** 429

## 7. Testing with Postman

### Setup Collection

1. Create new collection "OMDB Explorer"
2. Add environment variable:
   - `base_url`: `http://localhost:5000/api`

### Test Cases

**Search Movies:**
- Method: GET
- URL: `{{base_url}}/movies/search`
- Params: 
  - title: inception
  - page: 1

**Get Movie Details:**
- Method: GET
- URL: `{{base_url}}/movies/tt1375666`

**Tests Tab:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has success field", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData.success).to.be.true;
});

pm.test("Response has data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('data');
});
```

## 8. Popular Test Cases

### Movies to Test

**Classics:**
```bash
curl "http://localhost:5000/api/movies/search?title=godfather"
curl "http://localhost:5000/api/movies/tt0068646"  # The Godfather
```

**Recent:**
```bash
curl "http://localhost:5000/api/movies/search?title=oppenheimer&year=2023"
curl "http://localhost:5000/api/movies/tt15398776"  # Oppenheimer
```

**Series:**
```bash
curl "http://localhost:5000/api/movies/search?title=breaking+bad&type=series"
curl "http://localhost:5000/api/movies/tt0903747"  # Breaking Bad
```

**Action:**
```bash
curl "http://localhost:5000/api/movies/search?title=john+wick"
curl "http://localhost:5000/api/movies/tt2911666"  # John Wick
```

## 9. Performance Testing

### Response Time

```bash
# Measure response time
time curl "http://localhost:5000/api/movies/search?title=inception"
```

### Cached vs Uncached

```bash
# First request (uncached)
time curl "http://localhost:5000/api/movies/tt1375666"

# Second request (cached - should be faster)
time curl "http://localhost:5000/api/movies/tt1375666"
```

### Load Testing

Using `ab` (Apache Bench):
```bash
ab -n 100 -c 10 "http://localhost:5000/api/movies/search?title=test"
```

## 10. Error Scenarios

### Network Errors

**Stop OMDB API (simulate):**
- Backend will return 503 Service Unavailable

### Invalid Parameters

**Invalid year:**
```bash
curl "http://localhost:5000/api/movies/search?title=test&year=invalid"
```

**Invalid type:**
```bash
curl "http://localhost:5000/api/movies/search?title=test&type=invalid"
```

### CORS Testing

```bash
# From different origin (should work if CORS configured)
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     "http://localhost:5000/api/movies/search?title=test"
```

## 11. Integration Testing Script

Save as `test-api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:5000"
API_URL="$BASE_URL/api"

echo "Testing OMDB Explorer API..."
echo ""

# Test 1: Health Check
echo "1. Health Check"
curl -s "$BASE_URL/health" | jq
echo ""

# Test 2: Search Movies
echo "2. Search Movies"
curl -s "$API_URL/movies/search?title=inception" | jq
echo ""

# Test 3: Get Movie Details
echo "3. Get Movie Details"
curl -s "$API_URL/movies/tt1375666" | jq
echo ""

# Test 4: Search with Filters
echo "4. Search with Filters"
curl -s "$API_URL/movies/search?title=batman&year=2008" | jq
echo ""

# Test 5: Pagination
echo "5. Pagination Test"
curl -s "$API_URL/movies/search?title=star&page=2" | jq
echo ""

echo "All tests completed!"
```

Run with: `bash test-api.sh`

## 12. Monitoring

### Watch Logs

```bash
# Backend logs
cd backend
npm start

# Watch for:
# - Request logs
# - Cache hits/misses
# - Error messages
```

### Cache Statistics

You can add this endpoint to track cache performance:
```javascript
app.get('/api/cache/stats', (req, res) => {
  res.json(cacheService.getStats());
});
```

## 13. Common Issues

### "Movie not found"
- Check spelling of movie title
- Try different years
- Verify OMDB API key is valid

### "Too many requests"
- Wait 15 minutes
- Adjust rate limit in server.js if needed

### Timeout errors
- Check internet connection
- OMDB API might be slow
- Increase timeout in omdbService.js

## Quick Reference

**Base URL:** `http://localhost:5000`

**Endpoints:**
- `GET /health` - Health check
- `GET /api/movies/search` - Search movies
- `GET /api/movies/:id` - Get by IMDb ID
- `GET /api/movies/title/:title` - Get by title

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `429` - Rate Limited
- `500` - Server Error
- `503` - Service Unavailable

---

**Happy Testing! 🧪**
