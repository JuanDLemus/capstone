# redeploy_all.ps1
# Rebuilds the Android APK, updates static directories, builds the Vite project, redeploys to Vercel, and pushes commits to GitHub.
$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "     EchoVolt Rebuild & Redeploy Script    " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. COMPILE NATIVE APK
Write-Host "`n[1/5] Compiling Android Release APK..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\native_app"
& cmd.exe /c "cd android && gradlew.bat assembleRelease"
Set-Location "$PSScriptRoot"

# 2. COPY APK TO STATIC DIRS
Write-Host "`n[2/5] Copying compiled APK to public & dist..." -ForegroundColor Yellow
$apkSrc = "native_app/android/app/build/outputs/apk/release/app-release.apk"
if (Test-Path $apkSrc) {
    Copy-Item -Path $apkSrc -Destination "public/app-release.apk" -Force
    Write-Host "Copied to public/app-release.apk" -ForegroundColor Green
} else {
    Write-Host "Compiled APK not found at $apkSrc" -ForegroundColor Red
    exit 1
}

# 3. BUILD VITE WEB APP
Write-Host "`n[3/5] Building Vite React Web App..." -ForegroundColor Yellow
npm run build

# Make sure APK is also in the newly built dist folder
Copy-Item -Path $apkSrc -Destination "dist/app-release.apk" -Force
Write-Host "Copied to dist/app-release.apk" -ForegroundColor Green

# 4. DEPLOY TO VERCEL
Write-Host "`n[4/5] Deploying Web Guide to Vercel..." -ForegroundColor Yellow
& npx vercel deploy --prod --yes

# 5. COMMIT & PUSH TO GITHUB
Write-Host "`n[5/5] Staging, committing, and pushing updates to GitHub..." -ForegroundColor Yellow
git add .
$commitMsg = "chore: redeploy ecosystem with updated APK and web guide - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m $commitMsg
git push origin main

Write-Host "`nEcosystem successfully updated!" -ForegroundColor Green
Write-Host "Vercel URL: https://capstone-orcin-omega.vercel.app" -ForegroundColor Cyan
Write-Host "APK URL: https://capstone-orcin-omega.vercel.app/app-release.apk" -ForegroundColor Cyan
