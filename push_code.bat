@echo off
echo ==========================================
echo   Pushing ProfitLens AI to GitHub
echo ==========================================
echo.

:: Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com/downloads and try again.
    pause
    exit /b
)

echo [1/6] Initializing Git repository...
git init

echo [2/6] Adding files...
git add .

echo [3/6] Committing files...
git commit -m "Initial commit: Complete ProfitLens AI application"

echo [4/6] Renaming branch to main...
git branch -M main

echo [5/6] Adding remote origin...
git remote remove origin >nul 2>nul
git remote add origin https://github.com/veddhanani4/Profitlens-Ai.git

echo [6/6] Pushing to GitHub...
echo.
echo NOTE: A browser window or login prompt may appear. Please sign in.
echo.
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed. 
    echo Possible reasons:
    echo  - You are not logged in.
    echo  - The repository directory doesn't exist on GitHub yet.
    echo  - You don't have permission.
    pause
    exit /b
)

echo.
echo ==========================================
echo   SUCCESS! Code pushed to GitHub.
echo ==========================================
pause
