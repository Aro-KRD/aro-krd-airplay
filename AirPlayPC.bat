@echo off
setlocal
cd /d "%~dp0"

if not exist "%~dp0Aro-KRD-Airplay.exe" (
    echo [INFO] Executable not found, compiling now...
    call "%~dp0make-exe.bat" nopause
    if not exist "%~dp0Aro-KRD-Airplay.exe" (
        echo [ERROR] Failed to compile Aro-KRD-Airplay.exe.
        pause
        exit /b 1
    )
)

start "" "%~dp0Aro-KRD-Airplay.exe" %*
exit /b 0
