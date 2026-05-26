# run_qa.ps1
# Script to run the EchoVolt Automated QA Suite independently

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "      STARTING ECHOVOLT QA SUITE         " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Node.js is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

# Install QA dependencies if missing
Write-Host "Checking QA dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules/autocannon")) {
    Write-Host "Installing autocannon for load testing..." -ForegroundColor Yellow
    npm install --no-fund --no-audit
}

$webProcess = $null
$apiProcess = $null

function Check-Port {
    param([int]$port)
    try {
        $tcp = New-Object System.Net.Sockets.TcpClient
        $tcp.Connect("127.0.0.1", $port)
        $tcp.Close()
        return $true
    } catch {
        return $false
    }
}

Write-Host "Checking for running services..." -ForegroundColor Yellow

if (-not (Check-Port 8000)) {
    Write-Host "Starting FastAPI Backend..." -ForegroundColor Yellow
    $apiProcess = Start-Process -FilePath "python" -ArgumentList "-m uvicorn app.main:app --host 127.0.0.1 --port 8000" -WorkingDirectory "backend" -PassThru -NoNewWindow
}

if (-not (Check-Port 5173)) {
    Write-Host "Starting Vite Web Frontend..." -ForegroundColor Yellow
    $webProcess = Start-Process -FilePath "npm.cmd" -ArgumentList "run dev" -WorkingDirectory "." -PassThru -NoNewWindow
}

if ($apiProcess -or $webProcess) {
    Write-Host "Waiting 5 seconds for services to boot..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
}

Write-Host "Executing tests with verbose error reporting..." -ForegroundColor Green
Write-Host ""

# Run the test runner
node qa/test_runner.cjs
$exitCode = $LASTEXITCODE

# Cleanup
if ($apiProcess) {
    Write-Host "Stopping FastAPI Backend..." -ForegroundColor Yellow
    Stop-Process -Id $apiProcess.Id -Force -ErrorAction SilentlyContinue
}
if ($webProcess) {
    Write-Host "Stopping Vite Web Frontend..." -ForegroundColor Yellow
    Stop-Process -Id $webProcess.Id -Force -ErrorAction SilentlyContinue
}

Write-Host ""
if ($exitCode -eq 0) {
    Write-Host "QA RUN COMPLETED SUCCESSFULLY." -ForegroundColor Green
} else {
    Write-Host "QA RUN FAILED WITH ERRORS (Exit Code: $exitCode)." -ForegroundColor Red
}

exit $exitCode
