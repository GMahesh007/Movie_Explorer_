@echo off
echo ================================
echo OMDB Movie Explorer
echo Starting Backend and Frontend...
echo ================================
echo.

REM Check if backend dependencies are installed
if not exist "backend\node_modules" (
    echo ERROR: Backend dependencies not installed!
    echo Please run setup.bat first
    pause
    exit /b 1
)

REM Check if frontend dependencies are installed
if not exist "frontend\node_modules" (
    echo ERROR: Frontend dependencies not installed!
    echo Please run setup.bat first
    pause
    exit /b 1
)

REM Check if .env exists
if not exist "backend\.env" (
    echo ERROR: backend\.env file not found!
    echo Please copy backend\.env.example to backend\.env and add your OMDB API key
    pause
    exit /b 1
)

echo Starting Backend Server (Port 5000)...
start "Backend Server" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server (Port 3000)...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ================================
echo Servers Started!
echo ================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to stop all servers...
pause > nul

echo Stopping servers...
taskkill /FI "WindowTitle eq Backend Server*" /T /F > nul 2>&1
taskkill /FI "WindowTitle eq Frontend Server*" /T /F > nul 2>&1

echo Servers stopped.
