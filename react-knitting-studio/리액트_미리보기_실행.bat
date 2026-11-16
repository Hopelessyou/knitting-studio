@echo off
setlocal
cd /d "%~dp0"
title [Knitting Studio] React Preview Server

echo ========================================================
echo   [Knitting Studio] Starting React Production Preview...
echo   Opening browser at http://localhost:5173
echo   Close this window to stop the server.
echo ========================================================
echo.

if exist "%LOCALAPPDATA%\Programs\Python\Python313\python.exe" (
    "%LOCALAPPDATA%\Programs\Python\Python313\python.exe" preview_server.py
    goto :end
)

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    python preview_server.py
    goto :end
)

echo [ERROR] Python not found.
pause

:end
