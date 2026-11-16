@echo off
setlocal
cd /d "%~dp0"
title [Knitting Studio] Local Server

echo ========================================================
echo   [Knitting Studio] Starting Local Web Server...
echo   Opening browser at http://localhost:3000
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

echo [ERROR] Python 3 not found.
pause

:end
