<#
.SYNOPSIS
    Converts the Aro-KRD-Airplay logo into Windows icon (pcairplay.ico) and transparent PNGs.
.DESCRIPTION
    Extracts the emblem and full logo from logo.jpg, builds transparent and rounded-tile
    renderings, and packs a complete multi-resolution .ico (256, 128, 64, 48, 40, 32, 24, 20, 16)
    with proper PNG and 32-bit BGRA BMP entries.
#>
param(
    [string]$SourcePath,
    [string]$OutIcoPath
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing, PresentationCore, PresentationFramework, WindowsBase

$baseDir = Split-Path $PSScriptRoot -Parent
if (-not $SourcePath) { $SourcePath = Join-Path $baseDir 'logo.jpg' }
if (-not $OutIcoPath) { $OutIcoPath = Join-Path $baseDir 'pcairplay.ico' }

if (-not (Test-Path $SourcePath)) {
    throw "Source logo not found at: $SourcePath"
}

Write-Host "Processing Aro-KRD-Airplay logo: $SourcePath"

# 1. Load source image via GDI+
$src = [System.Drawing.Bitmap]::FromFile($SourcePath)
$w = $src.Width
$h = $src.Height

# 2. Extract emblem bounds (circle with brackets and TV)
# Bounding box of emblem alone: x: 135..895, y: 120..650
$emblemCropX = 135
$emblemCropY = 115
$emblemCropW = 760
$emblemCropH = 540

# Create high-res 1024x1024 transparent emblem image
$emblemBmp = New-Object System.Drawing.Bitmap 1024, 1024, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gEmblem = [System.Drawing.Graphics]::FromImage($emblemBmp)
$gEmblem.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gEmblem.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gEmblem.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Calculate centered position for emblem inside 1024x1024
$targetEmblemSize = 820
$emblemAspect = [double]$emblemCropW / $emblemCropH
$destW = $targetEmblemSize
$destH = [int]($destW / $emblemAspect)
$destX = [int]((1024 - $destW) / 2)
$destY = [int]((1024 - $destH) / 2)

$srcRect = New-Object System.Drawing.Rectangle $emblemCropX, $emblemCropY, $emblemCropW, $emblemCropH
$destRect = New-Object System.Drawing.Rectangle $destX, $destY, $destW, $destH
$gEmblem.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$gEmblem.Dispose()

# Make white background transparent on the emblem
$rectLock = New-Object System.Drawing.Rectangle 0, 0, 1024, 1024
$bmpData = $emblemBmp.LockBits($rectLock, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$totalBytes = 1024 * 1024 * 4
$pixelBytes = New-Object byte[] $totalBytes
[System.Runtime.InteropServices.Marshal]::Copy($bmpData.Scan0, $pixelBytes, 0, $totalBytes)

for ($i = 0; $i -lt $totalBytes; $i += 4) {
    $b = $pixelBytes[$i]
    $g = $pixelBytes[$i + 1]
    $r = $pixelBytes[$i + 2]
    # Check if pixel is white or off-white background
    if ($r -ge 245 -and $g -ge 245 -and $b -ge 245) {
        $pixelBytes[$i + 3] = 0 # Fully transparent
    } elseif ($r -ge 225 -and $g -ge 225 -and $b -ge 225) {
        # Soft feather edge
        $avg = ($r + $g + $b) / 3.0
        $calc = [int](255.0 * (245.0 - $avg) / 20.0)
        $alpha = [byte][Math]::Max(0, [Math]::Min(255, $calc))
        $pixelBytes[$i + 3] = [Math]::Min($pixelBytes[$i + 3], $alpha)
    }
}
[System.Runtime.InteropServices.Marshal]::Copy($pixelBytes, 0, $bmpData.Scan0, $totalBytes)
$emblemBmp.UnlockBits($bmpData)

# Save transparent emblem
$emblemPngPath = Join-Path $baseDir 'logo-mark.png'
$emblemBmp.Save($emblemPngPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created transparent emblem mark: $emblemPngPath"

# 3. Create full transparent logo (emblem + text)
$fullLogoBmp = New-Object System.Drawing.Bitmap $src
$fullLock = $fullLogoBmp.LockBits($rectLock, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$fullBytes = New-Object byte[] $totalBytes
[System.Runtime.InteropServices.Marshal]::Copy($fullLock.Scan0, $fullBytes, 0, $totalBytes)

for ($i = 0; $i -lt $totalBytes; $i += 4) {
    $b = $fullBytes[$i]
    $g = $fullBytes[$i + 1]
    $r = $fullBytes[$i + 2]
    if ($r -ge 245 -and $g -ge 245 -and $b -ge 245) {
        $fullBytes[$i + 3] = 0
    } elseif ($r -ge 225 -and $g -ge 225 -and $b -ge 225) {
        $avg = ($r + $g + $b) / 3.0
        $calc = [int](255.0 * (245.0 - $avg) / 20.0)
        $alpha = [byte][Math]::Max(0, [Math]::Min(255, $calc))
        $fullBytes[$i + 3] = [Math]::Min($fullBytes[$i + 3], $alpha)
    }
}
[System.Runtime.InteropServices.Marshal]::Copy($fullBytes, 0, $fullLock.Scan0, $totalBytes)
$fullLogoBmp.UnlockBits($fullLock)

$fullLogoPngPath = Join-Path $baseDir 'logo.png'
$fullLogoBmp.Save($fullLogoPngPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created transparent full logo: $fullLogoPngPath"

# 4. Create App Tile Icon (Modern Squircle with subtle gradient & border)
# This gives the icon crisp contrast on both light and dark Windows themes
function New-AppTileBitmap([int]$Size) {
    $tile = New-Object System.Drawing.Bitmap $Size, $Size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($tile)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $padding = [Math]::Max(1.0, $Size * 0.035)
    $tileW = $Size - (2 * $padding)
    $tileH = $Size - (2 * $padding)
    $radius = [Math]::Max(2.0, $tileW * 0.22)

    # Rounded rectangle path for the squircle tile
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $diameter = $radius * 2
    $arcRect = New-Object System.Drawing.RectangleF $padding, $padding, $diameter, $diameter
    $path.AddArc($arcRect, 180, 90)
    $arcRect.X = $padding + $tileW - $diameter
    $path.AddArc($arcRect, 270, 90)
    $arcRect.Y = $padding + $tileH - $diameter
    $path.AddArc($arcRect, 0, 90)
    $arcRect.X = $padding
    $path.AddArc($arcRect, 90, 90)
    $path.CloseFigure()

    # Fill tile with clean, crisp white-to-light-silver gradient
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush `
        (New-Object System.Drawing.PointF 0, $padding), `
        (New-Object System.Drawing.PointF 0, ($padding + $tileH)), `
        ([System.Drawing.Color]::FromArgb(255, 255, 255, 255)), `
        ([System.Drawing.Color]::FromArgb(255, 246, 248, 252))
    $g.FillPath($brush, $path)
    $brush.Dispose()

    # Draw subtle modern border
    $penWidth = [float][Math]::Max(1.0, ($Size * 0.015))
    $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(220, 215, 222, 232)), $penWidth
    $g.DrawPath($pen, $path)
    $pen.Dispose()

    # Draw emblem inside tile with 11% inner margin
    $innerPad = $Size * 0.11
    $innerSize = $Size - (2 * $innerPad)
    $innerAspect = [double]$emblemCropW / $emblemCropH
    $logoW = $innerSize
    $logoH = $logoW / $innerAspect
    $logoX = ($Size - $logoW) / 2
    $logoY = ($Size - $logoH) / 2

    $srcR = New-Object System.Drawing.Rectangle 0, 0, 1024, 1024
    $dstR = New-Object System.Drawing.RectangleF $logoX, $logoY, $logoW, $logoH
    $g.DrawImage($emblemBmp, $dstR, $srcR, [System.Drawing.GraphicsUnit]::Pixel)

    $path.Dispose()
    $g.Dispose()
    return $tile
}

# Save 1024x1024 tile preview
$tile1024 = New-AppTileBitmap 1024
$tile1024.Save((Join-Path $baseDir 'logo-tile.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$tile1024.Dispose()
Write-Host "Created app tile preview: $(Join-Path $baseDir 'logo-tile.png')"

# 5. Pack proper multi-size Windows .ico
# Windows standard icon sizes: 16, 20, 24, 32, 40, 48, 64, 128, 256
function Get-PngBytes([System.Drawing.Bitmap]$bmp) {
    $ms = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    , $ms.ToArray()
}

function Get-BmpIconEntryBytes([System.Drawing.Bitmap]$bmp, [int]$Size) {
    $stride = $Size * 4
    $rect = New-Object System.Drawing.Rectangle 0, 0, $Size, $Size
    $bd = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $pixels = New-Object byte[] ($stride * $Size)
    [System.Runtime.InteropServices.Marshal]::Copy($bd.Scan0, $pixels, 0, $pixels.Length)
    $bmp.UnlockBits($bd)

    $andStride = [int]([Math]::Ceiling($Size / 32.0) * 4)
    $ms = New-Object System.IO.MemoryStream
    $w = New-Object System.IO.BinaryWriter $ms

    # BITMAPINFOHEADER - biHeight is DOUBLE for XOR + AND
    $w.Write([int32]40)
    $w.Write([int32]$Size)
    $w.Write([int32]($Size * 2))
    $w.Write([int16]1)
    $w.Write([int16]32)
    $w.Write([int32]0)
    $w.Write([int32]($stride * $Size + $andStride * $Size))
    $w.Write([int32]0); $w.Write([int32]0); $w.Write([int32]0); $w.Write([int32]0)

    # XOR block, bottom-up
    for ($y = $Size - 1; $y -ge 0; $y--) {
        $w.Write($pixels, $y * $stride, $stride)
    }

    # AND mask (all zero, 32-bit straight alpha rules)
    $w.Write((New-Object byte[] ($andStride * $Size)))
    $w.Flush()
    , $ms.ToArray()
}

$bmpSizes = @(16, 20, 24, 32, 40, 48, 64, 128)
$entries = @()

foreach ($sz in $bmpSizes) {
    $b = New-AppTileBitmap $sz
    $data = Get-BmpIconEntryBytes $b $sz
    $entries += , @{ Size = $sz; Data = $data }
    $b.Dispose()
}

# 256x256 PNG compressed entry
$b256 = New-AppTileBitmap 256
$pngData = Get-PngBytes $b256
$entries += , @{ Size = 256; Data = $pngData }
$b256.Dispose()

# Write ICO file header and directory
$outIco = New-Object System.IO.MemoryStream
$wIco = New-Object System.IO.BinaryWriter $outIco
$wIco.Write([int16]0)                # Reserved
$wIco.Write([int16]1)                # Type 1 = Icon
$wIco.Write([int16]$entries.Count)   # Image count

$offset = 6 + 16 * $entries.Count
foreach ($e in $entries) {
    $dim = if ($e.Size -ge 256) { 0 } else { [byte]$e.Size }
    $wIco.Write([byte]$dim)           # Width
    $wIco.Write([byte]$dim)           # Height
    $wIco.Write([byte]0)              # Color count
    $wIco.Write([byte]0)              # Reserved
    $wIco.Write([int16]1)             # Planes
    $wIco.Write([int16]32)            # Bit count (32bpp BGRA)
    $wIco.Write([int32]$e.Data.Length)# Data bytes
    $wIco.Write([int32]$offset)       # File offset
    $offset += $e.Data.Length
}

foreach ($e in $entries) {
    $wIco.Write([byte[]]$e.Data)
}
$wIco.Flush()

[System.IO.File]::WriteAllBytes($OutIcoPath, $outIco.ToArray())
Write-Host "Successfully generated: $OutIcoPath ($($outIco.Length) bytes, $($entries.Count) sizes)"

# Verify loading with both GDI+ and WPF
$probeIcon = New-Object System.Drawing.Icon $OutIcoPath
$probeIcon.Dispose()
$wpfFrame = [System.Windows.Media.Imaging.BitmapFrame]::Create(
    (New-Object System.Uri $OutIcoPath), 'None', 'OnLoad')
Write-Host "Verified .ico with WPF: $($wpfFrame.PixelWidth)x$($wpfFrame.PixelHeight)"

$src.Dispose()
$emblemBmp.Dispose()
$fullLogoBmp.Dispose()
Write-Host "All logo assets built successfully!"
