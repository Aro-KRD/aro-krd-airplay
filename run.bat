@echo off
setlocal
cd /d "%~dp0"

if not exist "%~dp0AirBridge.exe" (
    echo [INFO] Executable not found, compiling now...
    call "%~dp0make-exe.bat" nopause
    if not exist "%~dp0AirBridge.exe" (
        echo [ERROR] Failed to compile AirBridge.exe.
        pause
        exit /b 1
    )
)

start "" "%~dp0AirBridge.exe" %*
exit /b 0
