@echo off
setlocal
cd /d "%~dp0"
title [Knitting Studio] Git Auto Push

echo ========================================================
echo   [Knitting Studio] Staging and committing files...
echo ========================================================
"C:\Program Files\Git\cmd\git.exe" add -A
"C:\Program Files\Git\cmd\git.exe" commit -m "feat: Complete 4 knitwear calculators with preview photos and tool checklists"

echo.
echo ========================================================
echo   [Knitting Studio] Pushing to GitHub (Hopelessyou)...
echo   If browser opens, click [Authorize / Sign in] once.
echo ========================================================
"C:\Program Files\Git\cmd\git.exe" remote set-url origin https://github.com/Hopelessyou/knitting-studio.git
"C:\Program Files\Git\cmd\git.exe" branch -M main
"C:\Program Files\Git\cmd\git.exe" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   [SUCCESS] GitHub push completed successfully!
    echo   Vercel automatic deployment will start shortly.
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo   [FAILED] Push encountered an issue. Check above.
    echo ========================================================
)
echo.
pause
