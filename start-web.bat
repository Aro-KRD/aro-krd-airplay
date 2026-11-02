@echo off
setlocal
title AirBridge Web - Development Server
cd /d "%~dp0arokrdairplayweb"

echo ========================================================================
echo                  AIRBRIDGE WEB SERVER LAUNCHER
echo ========================================================================
echo.
echo [INFO] Folder: %cd%
echo.

:: Ensure dependencies are installed
if not exist "node_modules\" (
    echo [INFO] First time setup: installing dependencies...
    where pnpm >nul 2>&1
    if %errorlevel% equ 0 (
        call pnpm install
    ) else (
        call npm install
    )
)

echo [INFO] Starting Next.js web application...
echo [INFO] Opening http://localhost:3000 in your default browser...
echo.

:: Open default web browser after a 2-second delay
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000"

:: Launch Next.js dev server
where pnpm >nul 2>&1
if %errorlevel% equ 0 (
    call pnpm dev
) else (
    call npm run dev
)

if errorlevel 1 (
    echo.
    echo [ERROR] Web server stopped unexpectedly.
    pause
)

