@echo off
setlocal
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"
title [Knitting Studio] React Vite Dev Server

echo ========================================================
echo   [Knitting Studio] Starting React Vite Dev Server...
echo   Opening browser at http://localhost:5173
echo   Close this window to stop the server.
echo ========================================================
echo.

if not exist "node_modules" (
    echo [INFO] First run detected. Installing npm dependencies...
    npm install
)

npm run dev
pause
