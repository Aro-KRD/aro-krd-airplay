@echo off
setlocal
cd /d "%~dp0"

echo ========================================================================
echo       BUILDING AIRPLAY WINDOWS EXECUTABLES AND LAUNCHERS
echo ========================================================================
echo.

call "%~dp0make-exe.bat"
if errorlevel 1 (
    echo [FAILED] Compilation failed.
    pause
    exit /b 1
)

echo [INFO] Self-testing compiled AirPlayPC.exe ...
"%~dp0AirPlayPC.exe" -SelfTest
if errorlevel 1 (
    echo [WARNING] Self-test returned error.
) else (
    echo [PASS] AirPlayPC.exe self-test passed successfully!
)

echo.
echo ========================================================================
echo [SUCCESS] Build finished! Double-click AirPlayPC.exe or run.bat to launch.
echo ========================================================================
echo.
