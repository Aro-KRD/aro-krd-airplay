Add-Type -AssemblyName PresentationCore, PresentationFramework, WindowsBase, System.Drawing

$raw = Get-Content (Join-Path $PSScriptRoot '..\airplay-ui.ps1') -Raw
$startTag = '<Window '
$endTag = '</Window>'
$startIdx = $raw.IndexOf($startTag)
$endIdx = $raw.IndexOf($endTag) + $endTag.Length
$xamlString = $raw.Substring($startIdx, $endIdx - $startIdx)

$stringReader = New-Object System.IO.StringReader $xamlString
$xmlReader = [System.Xml.XmlReader]::Create($stringReader)
$window = [System.Windows.Markup.XamlReader]::Load($xmlReader)

$w = 524
$root = $window.Content
$root.Measure((New-Object System.Windows.Size $w, 4000))
$measured = [int]$root.DesiredSize.Height
$root.Arrange((New-Object System.Windows.Rect 0, 0, $w, $measured))
$root.UpdateLayout()

$rtb = New-Object System.Windows.Media.Imaging.RenderTargetBitmap $w, $measured, 96, 96, ([System.Windows.Media.PixelFormats]::Pbgra32)
$rtb.Render($root)

$enc = New-Object System.Windows.Media.Imaging.PngBitmapEncoder
[void]$enc.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($rtb))
$outPath = Join-Path $PSScriptRoot '..\preview.png'
$fs = [System.IO.File]::Create($outPath)
try { $enc.Save($fs) } finally { $fs.Dispose() }

Write-Host "Rendered preview to $outPath ($w x $measured)"

