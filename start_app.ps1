# PROCESS CLEANUP
Write-Host "Cleaning up old processes on ports 5173 and 8081..." -ForegroundColor Cyan

$port5173 = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
if ($port5173) {
    foreach ($conn in $port5173) {
        Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
    }
    Write-Host "Killed processes on port 5173 (Web)" -ForegroundColor Yellow
}

$port8081 = Get-NetTCPConnection -LocalPort 8081 -ErrorAction SilentlyContinue
if ($port8081) {
    foreach ($conn in $port8081) {
        Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
    }
    Write-Host "Killed processes on port 8081 (Mobile Metro)" -ForegroundColor Yellow
}

# INSTALL DEPENDENCIES
Write-Host "Checking/Installing web dependencies..." -ForegroundColor Cyan
npm install

Write-Host "Checking/Installing mobile dependencies..." -ForegroundColor Cyan
cd native_app
npm install
cd ..

# START WEB PROTOTYPE (New interactive window)
Write-Host "Starting Web Prototype in new window..." -ForegroundColor Cyan
Start-Process -FilePath "cmd.exe" -ArgumentList "/k npm run dev"

# START MOBILE APP WITH TUNNEL (globally accessible QR)
Write-Host "Starting Mobile App (Expo) with tunnel in new window..." -ForegroundColor Cyan
Write-Host "IMPORTANT: Copy the ASCII QR from the Expo window and update config.json -> expo_ascii_qr" -ForegroundColor Yellow
Start-Process -FilePath "cmd.exe" -ArgumentList "/k cd native_app && npx expo start --tunnel"

Write-Host "Dev servers started in separate interactive windows." -ForegroundColor Green
Write-Host "After Expo tunnel QR appears: update config.json and push to GitHub." -ForegroundColor Cyan
