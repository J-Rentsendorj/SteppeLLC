@echo off
REM Development Server Startup Script (CMD version)
REM This script starts both the frontend and backend servers

echo ========================================
echo   Altan Dynamics - Development Setup
echo ========================================
echo.

echo [1/4] Checking .NET installation...
where dotnet >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: .NET 8 is not installed!
    echo Download from: https://dotnet.microsoft.com/download/dotnet/8.0
    pause
    exit /b 1
)
echo [OK] .NET installed
echo.

echo [2/4] Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js installed
echo.

echo [3/4] Starting Backend API Server...
echo Opening new terminal for backend...
start "Backend API Server" cmd /k "cd /d %~dp0backend\src\AltanDynamics.Api && echo === BACKEND API SERVER === && echo Running on: https://localhost:7212 && echo. && dotnet run"
echo [OK] Backend starting (check new window)
echo.

echo Waiting 5 seconds for backend to initialize...
timeout /t 5 /nobreak >nul
echo.

echo [4/4] Starting Frontend Dev Server...
echo Opening new terminal for frontend...
start "Frontend Dev Server" cmd /k "cd /d %~dp0 && echo === FRONTEND DEV SERVER === && echo Running on: http://localhost:5173 && echo. && npm run dev"
echo [OK] Frontend starting (check new window)
echo.

echo ========================================
echo   Development Servers Starting!
echo ========================================
echo.
echo Backend:  https://localhost:7212
echo Frontend: http://localhost:5173
echo.
echo API Docs: https://localhost:7212/swagger
echo.
echo Press any key to exit this window...
pause >nul
