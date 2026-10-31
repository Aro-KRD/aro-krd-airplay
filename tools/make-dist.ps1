<#
.SYNOPSIS
    Packages AirBridge into a standalone distribution ZIP archive with SHA256 checksums.
#>
param(
    [string]$Version = "1.0.0"
)

$ErrorActionPreference = 'Stop'
$baseDir = Split-Path $PSScriptRoot -Parent
$distDir = Join-Path $baseDir 'dist'
$stageDir = Join-Path $distDir "AirBridge"
$zipPath = Join-Path $distDir "AirBridge-v$Version.zip"

Write-Host "============================================================"
Write-Host "   PACKAGING AIRBRIDGE v$Version FOR PUBLIC RELEASE"
Write-Host "============================================================"
Write-Host ""

# 1. Ensure executables are compiled
& (Join-Path $baseDir 'make-exe.bat') nopause

# 2. Prepare clean staging directory
if (Test-Path $stageDir) { Remove-Item $stageDir -Recurse -Force }
New-Item -ItemType Directory -Path $stageDir -Force | Out-Null

# 3. Copy distribution files
$distFiles = @(
    'AirBridge.exe',
    'AirPlayPC.exe',
    'run.bat',
    'airplay-ui.ps1',
    'frame-mirror.ps1',
    'doctor.ps1',
    'setup.ps1',
    'start-airplay.ps1',
    'uxplay-common.ps1',
    'pcairplay.ico',
    'logo.png',
    'Diagnostics.cmd',
    'Framed Mirror.cmd',
    'README.md',
    'LICENSE'
)

foreach ($f in $distFiles) {
    $srcFile = Join-Path $baseDir $f
    if (Test-Path $srcFile) {
        Copy-Item -LiteralPath $srcFile -Destination (Join-Path $stageDir $f) -Force
        Write-Host "  + Included: $f"
    } else {
        Write-Warning "File not found: $f"
    }
}

# 4. Create ZIP archive
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Write-Host ""
Write-Host "Compressing into $zipPath ..."
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($stageDir, $zipPath, [System.IO.Compression.CompressionLevel]::Optimal, $false)

# 5. Calculate SHA-256 hash
$hash = (Get-FileHash -LiteralPath $zipPath -Algorithm SHA256).Hash.ToLowerInvariant()
$shaFile = Join-Path $distDir "SHA256SUMS.txt"
$shaEntry = "$hash  AirBridge-v$Version.zip"
Set-Content -LiteralPath $shaFile -Value $shaEntry -Encoding ASCII

Write-Host ""
Write-Host "============================================================"
Write-Host " [SUCCESS] Distribution Package Ready!"
Write-Host " Archive:  $zipPath"
Write-Host " Size:     $((Get-Item $zipPath).Length) bytes"
Write-Host " SHA-256:  $hash"
Write-Host "============================================================"
