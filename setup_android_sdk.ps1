# Setup Android SDK in capstone workspace
$ErrorActionPreference = "Stop"

$sdkRoot = "L:\atom\sabana\informatics\capstone\android-sdk"
$zipPath = "L:\atom\sabana\informatics\capstone\cmdline-tools.zip"
$downloadUrl = "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"

$destCmdlineTools = Join-Path $sdkRoot "cmdline-tools"
$destLatest = Join-Path $destCmdlineTools "latest"
$sdkManager = Join-Path $destLatest "bin\sdkmanager.bat"

if (Test-Path $sdkManager) {
    Write-Host "Android Commandline Tools already installed!" -ForegroundColor Green
} else {
    Write-Host "Creating Android SDK Root at $sdkRoot..." -ForegroundColor Cyan
    if (!(Test-Path $sdkRoot)) {
        New-Item -ItemType Directory -Path $sdkRoot -Force | Out-Null
    }

    Write-Host "Downloading Android CommandLine Tools using curl.exe..." -ForegroundColor Cyan
    curl.exe -L -o $zipPath $downloadUrl

    Write-Host "Extracting Command Line Tools..." -ForegroundColor Cyan
    $tempExtract = "L:\atom\sabana\informatics\capstone\temp_extract"
    if (Test-Path $tempExtract) {
        Remove-Item -Recurse -Force $tempExtract
    }
    New-Item -ItemType Directory -Path $tempExtract -Force | Out-Null

    Expand-Archive -Path $zipPath -DestinationPath $tempExtract

    if (Test-Path $destCmdlineTools) {
        Remove-Item -Recurse -Force $destCmdlineTools
    }
    New-Item -ItemType Directory -Path $destLatest -Force | Out-Null

    Write-Host "Moving files to correct SDK directory structure ($destLatest)..." -ForegroundColor Cyan
    Move-Item -Path "$tempExtract\cmdline-tools\*" -Destination $destLatest -Force

    # Clean up zip and temp extract
    Remove-Item -Force $zipPath
    Remove-Item -Recurse -Force $tempExtract

    Write-Host "Android Commandline Tools successfully installed!" -ForegroundColor Green
}

# Install SDK packages and automatically pipe 'y' to accept any licenses
Write-Host "Installing platform-tools, platforms;android-36, build-tools;36.0.0, and ndk;27.1.12297006..." -ForegroundColor Cyan

# To automate license acceptance during package installation, we pipe "y" to standard input.
# In PowerShell:
$inputData = "y`ny`ny`ny`ny`ny`ny`ny`ny`ny`ny`ny`ny`ny`ny`ny`ny`n"
$inputData | & $sdkManager --sdk_root=$sdkRoot "platform-tools" "platforms;android-36" "build-tools;36.0.0" "ndk;27.1.12297006"

# Accept any remaining licenses
Write-Host "Accepting remaining licenses..." -ForegroundColor Cyan
$inputData | & $sdkManager --sdk_root=$sdkRoot --licenses

# Configure local.properties for the native app
$localPropertiesPath = "L:\atom\sabana\informatics\capstone\native_app\android\local.properties"
Write-Host "Configuring local.properties at $localPropertiesPath..." -ForegroundColor Cyan
$sdkRootEscaped = $sdkRoot -replace '\\', '\\\\'
"sdk.dir=$sdkRootEscaped" | Out-File -FilePath $localPropertiesPath -Encoding utf8 -Force

Write-Host "Android SDK Setup Complete!" -ForegroundColor Green
