@echo off
cd /d "%~dp0"
echo [Knitting Studio] Staging and committing files...
"C:\Program Files\Git\cmd\git.exe" add index.html scarf.html beanie.html socks.html sweater.html community.html vercel.json server.py images
"C:\Program Files\Git\cmd\git.exe" commit -m "feat: Add finished preview images and complete roadmaps for all calculators"
echo.
echo [Knitting Studio] Pushing code to GitHub repository...
"C:\Program Files\Git\cmd\git.exe" remote set-url origin https://github.com/Hopelessyou/knitting-studio.git
"C:\Program Files\Git\cmd\git.exe" branch -M main
"C:\Program Files\Git\cmd\git.exe" push -u origin main
echo.
echo ==============================================
echo [SUCCESS] If no errors above, push completed!
echo ==============================================
pause
