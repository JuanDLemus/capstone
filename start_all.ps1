# start_all.ps1 - UNIFIED STARTUP SCRIPT
# Starts: backend, backend tunnel, Expo Metro with --tunnel, web dev server
# Auto-updates config.json and pushes to GitHub when tunnel URLs are ready

$ErrorActionPreference = "Stop"
$Root = $PSScriptRoot

# PROCESS CLEANUP
Write-Host "`n[1/5] Killing stale processes on ports 5173, 8081, 8000..." -ForegroundColor Cyan
foreach ($port in @(5173, 8081, 8000)) {
    $conns = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($conns) {
        $conns | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
        Write-Host "  Freed port $port" -ForegroundColor DarkGray
    }
}
Get-Process -Name "ngrok" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -like "*lt*" -or $_.MainWindowTitle -like "*localtunnel*" } | Stop-Process -Force -ErrorAction SilentlyContinue

# INSTALL DEPENDENCIES
Write-Host "`n[2/5] Checking dependencies..." -ForegroundColor Cyan
Push-Location $Root
npm install --silent
Push-Location "$Root\native_app"
npm install --silent
Pop-Location
Pop-Location

# START BACKEND
Write-Host "`n[3/5] Starting FastAPI backend (port 8000)..." -ForegroundColor Cyan
$BackendProc = Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/k cd /d `"$Root\backend`" && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000" `
    -PassThru
Start-Sleep -Seconds 3

# START BACKEND TUNNEL (localtunnel -> port 8000)
Write-Host "`n[4/5] Starting backend localtunnel..." -ForegroundColor Cyan
$LtLog = "$Root\lt.log"
Remove-Item $LtLog -ErrorAction SilentlyContinue
$LtProc = Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/c npx localtunnel --port 8000 > `"$LtLog`" 2>&1" `
    -PassThru

# WAIT FOR LOCALTUNNEL URL
$BackendUrl = ""
Write-Host "  Waiting for backend tunnel URL..." -ForegroundColor DarkGray
for ($i = 0; $i -lt 20; $i++) {
    Start-Sleep -Seconds 1
    if (Test-Path $LtLog) {
        $raw = Get-Content $LtLog -Raw -ErrorAction SilentlyContinue
        if ($raw -match "your url is: (https://[a-zA-Z0-9.-]+)") {
            $BackendUrl = $Matches[1]
            break
        }
    }
}

if ($BackendUrl) {
    Write-Host "  Backend tunnel: $BackendUrl" -ForegroundColor Green

    # UPDATE .ENV FILES AND CONFIG.JSON WITH BACKEND URL
    $ApiUrl = "$BackendUrl/api/v1"

    $CfgPath = "$Root\config.json"
    $cfg = Get-Content $CfgPath -Raw | ConvertFrom-Json
    $cfg.api_base_url = $ApiUrl
    $cfg | ConvertTo-Json -Depth 10 | Set-Content $CfgPath -Encoding UTF8

    foreach ($envFile in @("$Root\.env", "$Root\native_app\.env")) {
        if (Test-Path $envFile) {
            $ev = Get-Content $envFile -Raw
            $ev = $ev -replace "VITE_API_BASE_URL=.*", "VITE_API_BASE_URL=$ApiUrl"
            $ev = $ev -replace "EXPO_PUBLIC_API_BASE_URL=.*", "EXPO_PUBLIC_API_BASE_URL=$ApiUrl"
            Set-Content $envFile $ev -Encoding UTF8 -NoNewline
        }
    }

    Write-Host "  Updated .env and config.json with backend URL: $ApiUrl" -ForegroundColor Green
} else {
    Write-Host "  WARNING: Could not get backend tunnel URL. Using existing config." -ForegroundColor Yellow
}

# START WEB DEV SERVER
Write-Host "`n[5/5] Starting web dev server (port 5173)..." -ForegroundColor Cyan
$WebProc = Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/k cd /d `"$Root`" && npm run dev" `
    -PassThru

# START NGROK TUNNEL
Write-Host "`nStarting ngrok tunnel for Expo Metro on port 8081..." -ForegroundColor Cyan
$NgrokProc = Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/c ngrok http 8081" `
    -WindowStyle Minimized `
    -PassThru

# POLL NGROK API
$NgrokUrl = ""
$Deadline = (Get-Date).AddSeconds(120)
Write-Host "  Polling ngrok API for Expo tunnel URL..." -ForegroundColor DarkGray

while ((Get-Date) -lt $Deadline) {
    Start-Sleep -Seconds 3
    foreach ($ngrokPort in @(4040, 4041, 4042, 4043, 4044, 4045)) {
        try {
            $resp = Invoke-RestMethod "http://localhost:$ngrokPort/api/tunnels" -TimeoutSec 2 -ErrorAction Stop
            $https = $resp.tunnels | Where-Object { $_.proto -eq "https" } | Select-Object -First 1
            if ($https -and $https.public_url -notmatch "loca\.lt") {
                $NgrokUrl = $https.public_url
                break
            }
        } catch { }
    }
    if ($NgrokUrl) { break }
}

if (-not $NgrokUrl) {
    Write-Host "`n  WARNING: ngrok tunnel for Expo not detected within 2 minutes." -ForegroundColor Yellow
}

$ExpoUrl = ""
if ($NgrokUrl) {
    $ExpoUrl = $NgrokUrl -replace "^https://", "exp://"
    Write-Host "  ngrok tunnel found: $NgrokUrl" -ForegroundColor Green
    Write-Host "  Expo URL: $ExpoUrl" -ForegroundColor Green
}

# START EXPO METRO
Write-Host "`nStarting Expo Metro bundler with EXPO_PACKAGER_PROXY_URL..." -ForegroundColor Cyan
$ExpoProc = Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/k cd /d `"$Root\native_app`" && set EXPO_PACKAGER_PROXY_URL=$NgrokUrl && npx expo start --lan" `
    -PassThru

if ($ExpoUrl) {
    # GENERATE QR CODES
    $QrImgUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=000000&bgcolor=ffffff&data=" + [Uri]::EscapeDataString($ExpoUrl)

    $AsciiQr = ""
    try {
        $AsciiQr = python -c "
import qrcode, io
qr = qrcode.QRCode(border=1)
qr.add_data('$ExpoUrl')
qr.make(fit=True)
buf = io.StringIO()
qr.print_ascii(out=buf)
print(buf.getvalue(), end='')
" 2>$null
    } catch {
        $AsciiQr = $ExpoUrl
    }

    # UPDATE CONFIG AND GITHUB
    $cfg = Get-Content "$Root\config.json" -Raw | ConvertFrom-Json
    $cfg.expo_tunnel_url = $ExpoUrl
    $cfg.expo_ascii_qr   = $AsciiQr
    $cfg | ConvertTo-Json -Depth 10 | Set-Content "$Root\config.json" -Encoding UTF8

    Write-Host "  Pushing updated config.json to GitHub..." -ForegroundColor DarkGray
    Push-Location $Root
    git add config.json | Out-Null
    git commit -m "chore: update live Expo tunnel URL and backend URL [skip ci]" | Out-Null
    git push origin main | Out-Null
    Pop-Location

    Write-Host "`n  GitHub config.json updated." -ForegroundColor Green
    Write-Host "  Graphical QR: $QrImgUrl" -ForegroundColor Cyan
    Write-Host "`n  Open the web portal download page to scan the live QR." -ForegroundColor White

} else {
    Write-Host "`n  Expo URL not captured." -ForegroundColor Yellow
}

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "  All services started." -ForegroundColor Green
Write-Host "  Web portal:     https://capstone-orcin-omega.vercel.app" -ForegroundColor White
Write-Host "  Backend tunnel: $BackendUrl" -ForegroundColor White
Write-Host "  Expo tunnel:    $ExpoUrl" -ForegroundColor White
Write-Host "  Web dev:        http://localhost:5173" -ForegroundColor White
Write-Host "============================================`n" -ForegroundColor Cyan
