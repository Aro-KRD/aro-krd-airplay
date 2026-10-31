@echo off
setlocal
cd /d "%~dp0"

echo ========================================================================
echo       BUILDING AIRBRIDGE WINDOWS EXECUTABLE LAUNCHER (.EXE)
echo ========================================================================
echo.

set CSC=C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe
if not exist "%CSC%" set CSC=C:\Windows\Microsoft.NET\Framework\v4.0.30319\csc.exe

if not exist "%CSC%" (
    echo [ERROR] .NET Framework 4.0 C# compiler csc.exe not found.
    if /i not "%~1"=="nopause" pause
    exit /b 1
)

echo [INFO] Using C# Compiler: %CSC%
echo [INFO] Compiling tools\AirPlayLauncher.cs with embedded pcairplay.ico ...

"%CSC%" /nologo /target:winexe /win32icon:pcairplay.ico /reference:System.Windows.Forms.dll /out:AirBridge.exe tools\AirPlayLauncher.cs

if errorlevel 1 (
    echo.
    echo [FAILED] Compilation failed.
    if /i not "%~1"=="nopause" pause
    exit /b 1
)

copy /y AirBridge.exe AirPlayPC.exe >nul
copy /y AirBridge.exe aro-krd-airplay.exe >nul
copy /y AirBridge.exe Aro-KRD-Airplay.exe >nul

echo.
echo ========================================================================
echo [SUCCESS] Windows Executables created successfully:
echo   - %~dp0AirBridge.exe
echo   - %~dp0AirPlayPC.exe
echo   - %~dp0aro-krd-airplay.exe
echo   - %~dp0Aro-KRD-Airplay.exe
echo ========================================================================
echo.
if /i not "%~1"=="nopause" (
    rem Only pause if explicitly running directly without nopause
)
