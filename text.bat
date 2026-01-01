@echo off
chcp 65001 >nul
set HOST=http://127.0.0.1:8000

echo === 1. 音乐接口 ===
powershell -Command "(Invoke-WebRequest -Uri %HOST%/music/list -UseBasicParsing).Content | ConvertFrom-Json | ForEach-Object { $_.tracks.Count }"

echo === 2. 静态文件 ===
powershell -Command "(Invoke-WebRequest -Uri %HOST%/music/三時.mp3 -Method Head -UseBasicParsing).StatusCode"

echo === 3. 穿透防护 ===
powershell -Command "(Invoke-WebRequest -Uri %HOST%/posts/../../../etc/passwd -Method Head -UseBasicParsing).StatusCode"

echo === 4. 404 兜底 ===
powershell -Command "(Invoke-WebRequest -Uri %HOST%/no/such/page -Method Head -UseBasicParsing).StatusCode"

pause