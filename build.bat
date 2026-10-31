@echo off
setlocal
cd /d "%~dp0"

echo ========================================================================
echo       BUILDING AIRBRIDGE WINDOWS EXECUTABLES AND LAUNCHERS
echo ========================================================================
echo.

call "%~dp0make-exe.bat" %*
if errorlevel 1 (
    echo [FAILED] Compilation failed.
    if /i not "%~1"=="nopause" pause
    exit /b 1
)

echo [INFO] Self-testing compiled AirBridge.exe ...
"%~dp0AirBridge.exe" -SelfTest
if errorlevel 1 (
    echo [WARNING] AirBridge.exe self-test returned error.
) else (
    echo [PASS] AirBridge.exe self-test passed successfully!
)

echo.
echo ========================================================================
echo [SUCCESS] Build finished! Double-click AirBridge.exe or run.bat to launch.
echo ========================================================================
echo.
if /i not "%~1"=="nopause" (
    pause
)
