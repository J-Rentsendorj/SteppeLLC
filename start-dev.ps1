# Development Server Startup Script
# This script starts both the frontend and backend servers

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Altan Dynamics - Development Setup  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .NET is installed
Write-Host "[1/4] Checking .NET installation..." -ForegroundColor Yellow
if (!(Get-Command dotnet -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: .NET 8 is not installed!" -ForegroundColor Red
    Write-Host "Download from: https://dotnet.microsoft.com/download/dotnet/8.0" -ForegroundColor Red
    exit 1
}
Write-Host "✓ .NET installed" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
Write-Host "[2/4] Checking Node.js installation..." -ForegroundColor Yellow
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Node.js is not installed!" -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Node.js installed" -ForegroundColor Green
Write-Host ""

# Start Backend in new window
Write-Host "[3/4] Starting Backend API Server..." -ForegroundColor Yellow
Write-Host "Opening new terminal for backend..." -ForegroundColor Gray
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend\src\AltanDynamics.Api'; Write-Host '=== BACKEND API SERVER ===' -ForegroundColor Cyan; Write-Host 'Running on: https://localhost:7212' -ForegroundColor Green; Write-Host ''; dotnet run"
Write-Host "✓ Backend starting (check new window)" -ForegroundColor Green
Write-Host ""

# Wait a moment for backend to initialize
Write-Host "Waiting 5 seconds for backend to initialize..." -ForegroundColor Gray
Start-Sleep -Seconds 5

# Start Frontend in new window
Write-Host "[4/4] Starting Frontend Dev Server..." -ForegroundColor Yellow
Write-Host "Opening new terminal for frontend..." -ForegroundColor Gray
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; Write-Host '=== FRONTEND DEV SERVER ===' -ForegroundColor Cyan; Write-Host 'Running on: http://localhost:5173' -ForegroundColor Green; Write-Host ''; npm run dev"
Write-Host "✓ Frontend starting (check new window)" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Development Servers Starting!       " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  https://localhost:7212" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "API Docs: https://localhost:7212/swagger" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
