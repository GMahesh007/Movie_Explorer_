#!/bin/bash

echo "================================"
echo "OMDB Movie Explorer - Setup"
echo "================================"
echo ""

echo "Step 1: Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Backend installation failed"
    exit 1
fi
echo "Backend dependencies installed!"
echo ""

echo "Step 2: Setting up backend environment..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo ".env file created. Please edit it and add your OMDB API key!"
    echo "Get your API key from: https://www.omdbapi.com/apikey.aspx"
else
    echo ".env file already exists"
fi
cd ..
echo ""

echo "Step 3: Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend installation failed"
    exit 1
fi
echo "Frontend dependencies installed!"
cd ..
echo ""

echo "================================"
echo "Setup Complete!"
echo "================================"
echo ""
echo "IMPORTANT: Edit backend/.env and add your OMDB API key"
echo ""
echo "To start the application:"
echo "  1. Terminal 1: cd backend && npm start"
echo "  2. Terminal 2: cd frontend && npm run dev"
echo "  3. Visit: http://localhost:3000"
echo ""
echo "See README.md for detailed instructions"
echo ""
