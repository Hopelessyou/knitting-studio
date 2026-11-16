@echo off
chcp 65001 >nul
title 니팅 스튜디오 로컬 웹 서버
echo ========================================================
echo   🧶 니팅 스튜디오 로컬 웹 서버를 실행합니다!
echo   브라우저가 열리면 유튜브 영상이 153 오류 없이 100%% 정상 재생됩니다.
echo ========================================================
echo.
start http://localhost:3000/
powershell -NoProfile -ExecutionPolicy Bypass -Command "$listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:3000/'); $listener.Start(); Write-Host '>> [성공] 서버 가동 중: http://localhost:3000'; Write-Host '>> 종료하려면 이 검은색 창을 닫아주세요.'; while ($listener.IsListening) { try { $ctx = $listener.GetContext(); $req = $ctx.Request; $res = $ctx.Response; $path = $req.Url.LocalPath.TrimStart('/'); if ([string]::IsNullOrEmpty($path) -or $path -eq '/') { $path = 'index.html' }; if (-not (Test-Path $path)) { $res.StatusCode = 404; $res.Close(); continue }; $bytes = [System.IO.File]::ReadAllBytes($path); $res.ContentType = if ($path.EndsWith('.html')) { 'text/html; charset=utf-8' } elseif ($path.EndsWith('.json')) { 'application/json' } else { 'application/octet-stream' }; $res.ContentLength64 = $bytes.Length; $res.OutputStream.Write($bytes, 0, $bytes.Length); $res.Close(); } catch {} }"
pause
