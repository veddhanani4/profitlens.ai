@echo off
echo ==========================================
echo   Deploying ProfitLens AI to Vercel
echo ==========================================
echo.

:: Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is NOT installed.
    echo.
    echo 1. Please go to https://nodejs.org/
    echo 2. Download and Install the "LTS" version.
    echo 3. Restart this script after installing.
    echo.
    pause
    exit /b
)

echo [1/3] Installing Vercel CLI...
call npm install -g vercel

echo.
echo [2/3] Logging in to Vercel...
echo       A browser window will open. Please log in properly.
call vercel login

echo.
echo [3/3] Deploying to Production...
echo.
echo       Press ENTER for all questions to accept defaults!
echo.
call vercel --prod

echo.
echo ==========================================
echo   Deployment Complete!
echo ==========================================
pause
