# PROCESS CLEANUP
Write-Host "Cleaning up old processes on ports 5173, 8081, and 8000..." -ForegroundColor Cyan

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

$port8000 = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue
if ($port8000) {
    foreach ($conn in $port8000) {
        Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
    }
    Write-Host "Killed processes on port 8000 (Backend)" -ForegroundColor Yellow
}

# INSTALL DEPENDENCIES
Write-Host "Checking/Installing web dependencies..." -ForegroundColor Cyan
npm install

Write-Host "Checking/Installing mobile dependencies..." -ForegroundColor Cyan
cd native_app
npm install
cd ..

# START BACKEND
Write-Host "Starting FastAPI Backend in new window..." -ForegroundColor Cyan
Start-Process -FilePath "cmd.exe" -ArgumentList "/k cd backend && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000"

# START TUNNEL FOR BACKEND
Remove-Item -Path "lt.log" -ErrorAction SilentlyContinue
Write-Host "Starting Localtunnel proxy for Backend on port 8000..." -ForegroundColor Cyan
$ltProcess = Start-Process -FilePath "cmd.exe" -ArgumentList "/c npx localtunnel --port 8000 > lt.log 2>&1" -PassThru

# Wait for the log to be populated with the URL
Write-Host "Waiting for tunnel URL generation..." -ForegroundColor Yellow
$url = ""
for ($i = 0; $i -lt 15; $i++) {
    Start-Sleep -Seconds 1
    if (Test-Path "lt.log") {
        $log = Get-Content "lt.log" -Raw
        if ($log -match "your url is: (https://[a-zA-Z0-9.-]+)") {
            $url = $Matches[1]
            break
        }
    }
}

if ($url) {
    Write-Host "Tunnel established! Public URL: $url" -ForegroundColor Green
    
    # Update config.json
    $cfgPath = "config.json"
    if (Test-Path $cfgPath) {
        $config = Get-Content $cfgPath -Raw | ConvertFrom-Json
        $config.api_base_url = "$url/api/v1"
        $config | ConvertTo-Json -Depth 10 | Set-Content $cfgPath
        Write-Host "Updated config.json with new API Base URL: $url/api/v1" -ForegroundColor Green
    }
    
    # Update .env files
    if (Test-Path ".env") {
        $envContent = Get-Content ".env" -Raw
        $envContent = $envContent -replace "VITE_API_BASE_URL=.*", "VITE_API_BASE_URL=$url/api/v1"
        $envContent = $envContent -replace "EXPO_PUBLIC_API_BASE_URL=.*", "EXPO_PUBLIC_API_BASE_URL=$url/api/v1"
        $envContent | Set-Content ".env"
    }
    if (Test-Path "native_app/.env") {
        $envContent = Get-Content "native_app/.env" -Raw
        $envContent = $envContent -replace "EXPO_PUBLIC_API_BASE_URL=.*", "EXPO_PUBLIC_API_BASE_URL=$url/api/v1"
        $envContent | Set-Content "native_app/.env"
    }
    
    # Commit and push config.json to GitHub
    Write-Host "Pushing updated config.json to GitHub raw..." -ForegroundColor Yellow
    git add config.json
    git commit -m "chore: update active backend api_base_url to $url [skip ci]"
    git push origin main
    Write-Host "Successfully pushed tunnel URL to GitHub." -ForegroundColor Green
} else {
    Write-Host "Warning: Could not establish localtunnel. Using fallback/existing base URLs." -ForegroundColor Red
}

# START WEB PROTOTYPE (New interactive window)
Write-Host "Starting Web Prototype in new window..." -ForegroundColor Cyan
Start-Process -FilePath "cmd.exe" -ArgumentList "/k npm run dev"

# START MOBILE APP WITH TUNNEL (globally accessible QR)
Write-Host "Starting Mobile App (Expo) with tunnel in new window..." -ForegroundColor Cyan
Write-Host "IMPORTANT: Copy the ASCII QR from the Expo window and update config.json -> expo_ascii_qr" -ForegroundColor Yellow
Start-Process -FilePath "cmd.exe" -ArgumentList "/k cd native_app && npx expo start --tunnel"

Write-Host "Dev servers started in separate interactive windows." -ForegroundColor Green
Write-Host "After Expo tunnel QR appears: update config.json and push to GitHub." -ForegroundColor Cyan
