@echo off
setlocal
cd /d "%~dp0"
title [Knitting Studio] Local Server

echo ========================================================
echo   Starting Knitting Studio Local Web Server...
echo   Your web browser will open automatically.
echo   Close this window to stop the server.
echo ========================================================
echo.

if exist "%LOCALAPPDATA%\Programs\Python\Python313\python.exe" (
    "%LOCALAPPDATA%\Programs\Python\Python313\python.exe" server.py
    goto :end
)

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    python server.py
    goto :end
)

where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    py server.py
    goto :end
)

echo [ERROR] Python not found.
pause

:end
