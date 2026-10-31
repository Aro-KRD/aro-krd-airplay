<#
.SYNOPSIS
    Generates the Inno Setup wizard bitmaps in installer\ using the Aro-KRD-Airplay logo.
.DESCRIPTION
    Draws the installer art with WPF and writes the four 24-bit BMPs
    the .iss references (Inno accepts only BMP here, no alpha):

        wizard-image-100.bmp   164x314  left panel of the welcome/finish pages
        wizard-image-200.bmp   328x628  same, for 200% DPI
        wizard-small-100.bmp    55x55   top-right tile of the inner pages
        wizard-small-200.bmp   110x110  same, for 200% DPI
#>
param(
    [string]$OutDir
)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName PresentationCore, PresentationFramework, WindowsBase, System.Drawing

$baseDir = Split-Path $PSScriptRoot -Parent
if (-not $OutDir) {
    $OutDir = Join-Path $baseDir 'installer'
}

$logoMarkPath = Join-Path $baseDir 'logo-mark.png'
if (-not (Test-Path $logoMarkPath)) {
    throw "logo-mark.png not found at $logoMarkPath"
}

$logoUri = New-Object System.Uri $logoMarkPath
$logoBitmap = New-Object System.Windows.Media.Imaging.BitmapImage
$logoBitmap.BeginInit()
$logoBitmap.UriSource = $logoUri
$logoBitmap.CacheOption = [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
$logoBitmap.EndInit()
$logoBitmap.Freeze()

function New-Color([string]$Hex) {
    [System.Windows.Media.ColorConverter]::ConvertFromString($Hex)
}

function New-WizardImageSource([int]$W, [int]$H) {
    $dv = New-Object System.Windows.Media.DrawingVisual
    $dc = $dv.RenderOpen()
    $dc.PushTransform((New-Object System.Windows.Media.ScaleTransform ($W / 164.0), ($H / 314.0)))

    # Background: dark vertical gradient matching the UI
    $bg = New-Object System.Windows.Media.LinearGradientBrush
    $bg.StartPoint = New-Object System.Windows.Point 0, 0
    $bg.EndPoint   = New-Object System.Windows.Point 0, 1
    [void]$bg.GradientStops.Add((New-Object System.Windows.Media.GradientStop (New-Color '#13151A'), 0.0))
    [void]$bg.GradientStops.Add((New-Object System.Windows.Media.GradientStop (New-Color '#0A0B0D'), 0.45))
    [void]$bg.GradientStops.Add((New-Object System.Windows.Media.GradientStop (New-Color '#050506'), 1.0))
    $dc.DrawRectangle($bg, $null, (New-Object System.Windows.Rect 0, 0, 164, 314))

    # Soft blue halo behind the mark
    $halo = New-Object System.Windows.Media.RadialGradientBrush
    [void]$halo.GradientStops.Add((New-Object System.Windows.Media.GradientStop (New-Color '#350A84FF'), 0.0))
    [void]$halo.GradientStops.Add((New-Object System.Windows.Media.GradientStop (New-Color '#150A84FF'), 0.5))
    [void]$halo.GradientStops.Add((New-Object System.Windows.Media.GradientStop (New-Color '#000A84FF'), 1.0))
    $dc.DrawEllipse($halo, $null, (New-Object System.Windows.Point 82, 115), 75, 75)

    # Draw rounded white squircle card for the Aro-KRD-Airplay logo
    $cardRect = New-Object System.Windows.Rect 34, 67, 96, 96
    $cardBrush = New-Object System.Windows.Media.LinearGradientBrush
    $cardBrush.StartPoint = New-Object System.Windows.Point 0, 0
    $cardBrush.EndPoint   = New-Object System.Windows.Point 0, 1
    [void]$cardBrush.GradientStops.Add((New-Object System.Windows.Media.GradientStop (New-Color '#FFFFFF'), 0.0))
    [void]$cardBrush.GradientStops.Add((New-Object System.Windows.Media.GradientStop (New-Color '#F4F6F9'), 1.0))
    $cardPen = New-Object System.Windows.Media.Pen (New-Object System.Windows.Media.SolidColorBrush (New-Color '#403B82F6')), 1.5
    $dc.DrawRoundedRectangle($cardBrush, $cardPen, $cardRect, 20, 20)

    # Draw Aro-KRD-Airplay emblem inside card
    $logoRect = New-Object System.Windows.Rect 42, 75, 80, 80
    $dc.DrawImage($logoBitmap, $logoRect)

    # Aro-KRD-Airplay brand text
    $tf = New-Object System.Windows.Media.Typeface (
        (New-Object System.Windows.Media.FontFamily 'Segoe UI'),
        [System.Windows.FontStyles]::Normal,
        [System.Windows.FontWeights]::Bold,
        [System.Windows.FontStretches]::Normal)
    $ft = New-Object System.Windows.Media.FormattedText 'Aro-KRD-Airplay',
        ([System.Globalization.CultureInfo]::InvariantCulture),
        ([System.Windows.FlowDirection]::LeftToRight), $tf, 20.0,
        (New-Object System.Windows.Media.SolidColorBrush (New-Color '#FFFFFF'))
    $dc.DrawText($ft, (New-Object System.Windows.Point (82 - $ft.Width / 2), 182))

    $tfSub = New-Object System.Windows.Media.Typeface (
        (New-Object System.Windows.Media.FontFamily 'Segoe UI'),
        [System.Windows.FontStyles]::Normal,
        [System.Windows.FontWeights]::Normal,
        [System.Windows.FontStretches]::Normal)
    $ftSub = New-Object System.Windows.Media.FormattedText 'AirPlay PC Receiver',
        ([System.Globalization.CultureInfo]::InvariantCulture),
        ([System.Windows.FlowDirection]::LeftToRight), $tfSub, 10.5,
        (New-Object System.Windows.Media.SolidColorBrush (New-Color '#9CA3AF'))
    $dc.DrawText($ftSub, (New-Object System.Windows.Point (82 - $ftSub.Width / 2), 208))

    $dc.Pop()
    $dc.Close()

    $rtb = New-Object System.Windows.Media.Imaging.RenderTargetBitmap $W, $H, 96, 96, ([System.Windows.Media.PixelFormats]::Pbgra32)
    $rtb.Render($dv)
    $rtb
}

function New-SmallImageSource([int]$Size) {
    $dv = New-Object System.Windows.Media.DrawingVisual
    $dc = $dv.RenderOpen()
    $s = $Size / 55.0
    $dc.PushTransform((New-Object System.Windows.Media.ScaleTransform $s, $s))
    $dc.DrawRectangle((New-Object System.Windows.Media.SolidColorBrush (New-Color '#0B0C10')), $null,
        (New-Object System.Windows.Rect 0, 0, 55, 55))

    # White squircle card
    $cardRect = New-Object System.Windows.Rect 5, 5, 45, 45
    $cardBrush = New-Object System.Windows.Media.SolidColorBrush (New-Color '#FFFFFF')
    $cardPen = New-Object System.Windows.Media.Pen (New-Object System.Windows.Media.SolidColorBrush (New-Color '#CBD5E1')), 1.0
    $dc.DrawRoundedRectangle($cardBrush, $cardPen, $cardRect, 10, 10)

    # Logo image inside
    $logoRect = New-Object System.Windows.Rect 8, 8, 39, 39
    $dc.DrawImage($logoBitmap, $logoRect)

    $dc.Pop()
    $dc.Close()

    $rtb = New-Object System.Windows.Media.Imaging.RenderTargetBitmap $Size, $Size, 96, 96, ([System.Windows.Media.PixelFormats]::Pbgra32)
    $rtb.Render($dv)
    $rtb
}

function Save-Bmp($Source, [string]$Path) {
    $conv = New-Object System.Windows.Media.Imaging.FormatConvertedBitmap
    $conv.BeginInit(); $conv.Source = $Source
    $conv.DestinationFormat = [System.Windows.Media.PixelFormats]::Bgr24
    $conv.EndInit()
    $enc = New-Object System.Windows.Media.Imaging.BmpBitmapEncoder
    [void]$enc.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($conv))
    $fs = [System.IO.File]::Create($Path)
    try { $enc.Save($fs) } finally { $fs.Dispose() }
    Write-Host ("OK: {0}  ({1:N0} bytes)" -f $Path, (Get-Item $Path).Length)
}

Save-Bmp (New-WizardImageSource 164 314) (Join-Path $OutDir 'wizard-image-100.bmp')
Save-Bmp (New-WizardImageSource 328 628) (Join-Path $OutDir 'wizard-image-200.bmp')
Save-Bmp (New-SmallImageSource 55)       (Join-Path $OutDir 'wizard-small-100.bmp')
Save-Bmp (New-SmallImageSource 110)      (Join-Path $OutDir 'wizard-small-200.bmp')
Write-Host "Inno Setup wizard artwork generated with Aro-KRD-Airplay branding!"
