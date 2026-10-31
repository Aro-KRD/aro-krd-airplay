@echo off
setlocal
cd /d "%~dp0"

echo ========================================================================
echo       PACKAGING AIRBRIDGE FOR PUBLIC RELEASE
echo ========================================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "tools\make-dist.ps1"
if errorlevel 1 (
    echo.
    echo [FAILED] Packaging encountered errors.
    pause
    exit /b 1
)

echo.
echo Open folder dist\ to find your release archive.
if not "%1"=="nopause" pause

