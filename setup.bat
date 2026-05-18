@echo off
setlocal

echo.
echo =============================
echo Lovable Clone Setup (Windows)
echo =============================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js 18 or higher from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node -v
echo.

:: Install dependencies
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed
echo.

:: Check for .env.local
if not exist .env.local (
    echo Creating .env.local from template...
    copy .env.example .env.local >nul
    echo [OK] .env.local created
    echo.
    echo [IMPORTANT] Please edit .env.local and add your API keys:
    echo    - ANTHROPIC_API_KEY (required^)
    echo    - NEXT_PUBLIC_SUPABASE_URL (optional^)
    echo    - NEXT_PUBLIC_SUPABASE_ANON_KEY (optional^)
    echo.
    echo Get your Anthropic API key from: https://console.anthropic.com/
    echo.
    
    :: Open .env.local in notepad
    set /p OPEN_ENV="Open .env.local in Notepad now? (y/n): "
    if /i "%OPEN_ENV%"=="y" (
        start notepad .env.local
    )
) else (
    echo [OK] .env.local already exists
)

echo.
set /p START_DEV="Start development server now? (y/n): "
if /i "%START_DEV%"=="y" (
    echo.
    echo Starting development server...
    echo Open http://localhost:3000 in your browser
    echo.
    call npm run dev
) else (
    echo.
    echo Setup complete!
    echo.
    echo Next steps:
    echo 1. Edit .env.local and add your API keys
    echo 2. Run: npm run dev
    echo 3. Open: http://localhost:3000
    echo.
    pause
)
