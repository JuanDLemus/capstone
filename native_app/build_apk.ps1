# EchoVolt APK Build Script
# Builds an APK via EAS cloud. Requires Expo account login.
# Usage: .\build_apk.ps1

$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "        EchoVolt APK Build (EAS)         " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

Set-Location "$PSScriptRoot"

# CHECK EAS LOGIN
Write-Host "`nChecking EAS authentication..." -ForegroundColor Yellow
$whoami = npx eas-cli whoami 2>&1
if ($LASTEXITCODE -ne 0 -or $whoami -match "not logged in") {
    Write-Host "Not logged in. Running eas login..." -ForegroundColor Yellow
    npx eas-cli login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Login failed. Aborting." -ForegroundColor Red
        exit 1
    }
}
Write-Host "Logged in as: $whoami" -ForegroundColor Green

# RUN EAS BUILD
Write-Host "`nStarting EAS cloud APK build (profile: preview)..." -ForegroundColor Yellow
npx eas-cli build --platform android --profile preview --non-interactive

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nBuild submitted successfully." -ForegroundColor Green
    Write-Host "Download the APK from https://expo.dev after it completes (usually 5-15 min)." -ForegroundColor Cyan
} else {
    Write-Host "`nBuild failed. Check EAS dashboard for details." -ForegroundColor Red
    exit 1
}
