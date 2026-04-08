param(
  [int]$Quality = 80,
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$targets = @(
  (Join-Path $projectRoot 'assets\characters'),
  (Join-Path $projectRoot 'assets\shop')
)

function Resolve-FfmpegPath {
  $direct = Get-Command ffmpeg -ErrorAction SilentlyContinue
  if ($direct) { return $direct.Source }

  if (-not $env:LOCALAPPDATA) { return $null }

  $packagesRoot = Join-Path $env:LOCALAPPDATA 'Microsoft\WinGet\Packages'
  if (-not (Test-Path $packagesRoot)) { return $null }

  $vendorDirs = Get-ChildItem -Path $packagesRoot -Directory -ErrorAction SilentlyContinue |
    Where-Object { $_.Name.ToLower().StartsWith('gyan.ffmpeg_') }

  foreach ($vendor in $vendorDirs) {
    $innerDirs = Get-ChildItem -Path $vendor.FullName -Directory -ErrorAction SilentlyContinue
    foreach ($inner in $innerDirs) {
      $candidate = Join-Path $inner.FullName 'bin\ffmpeg.exe'
      if (Test-Path $candidate) {
        return $candidate
      }
    }
  }

  return $null
}

$ffmpegPath = Resolve-FfmpegPath
if (-not $ffmpegPath) {
  Write-Host '[optimize-images-webp] ffmpeg bulunamadi.'
  Write-Host 'Kurulum: winget install Gyan.FFmpeg veya https://ffmpeg.org/download.html'
  exit 0
}

Write-Host "[optimize-images-webp] Donusturucu: $ffmpegPath"

$files = Get-ChildItem -Path $targets -Recurse -File |
  Where-Object { $_.Extension -match '^\\.(png|jpg|jpeg)$' }

if (-not $files -or $files.Count -eq 0) {
  Write-Host '[optimize-images-webp] Hedef klasorlerde gorsel bulunamadi.'
  exit 0
}

[int]$converted = 0
[int]$skipped = 0
[int]$failed = 0
[int64]$srcBytes = 0
[int64]$webpBytes = 0

foreach ($file in $files) {
  $srcBytes += $file.Length
  $output = [System.IO.Path]::ChangeExtension($file.FullName, '.webp')

  $shouldConvert = -not (Test-Path $output)
  if (-not $shouldConvert) {
    $outFile = Get-Item -LiteralPath $output
    if ($outFile.LastWriteTimeUtc -lt $file.LastWriteTimeUtc) {
      $shouldConvert = $true
    }
  }

  if ($shouldConvert) {
    if ($DryRun) {
      $converted += 1
    } else {
      & $ffmpegPath -y -hide_banner -loglevel error -i $file.FullName -q:v $Quality -compression_level 6 $output
      if ($LASTEXITCODE -eq 0) {
        $converted += 1
      } else {
        $failed += 1
        Write-Host "[optimize-images-webp] Donusturulemedi: $($file.FullName)"
        continue
      }
    }
  } else {
    $skipped += 1
  }

  if ((-not $DryRun) -and (Test-Path $output)) {
    $webpBytes += (Get-Item -LiteralPath $output).Length
  }
}

Write-Host "[optimize-images-webp] Taranan dosya: $($files.Count)"
Write-Host "[optimize-images-webp] Donusen dosya: $converted"
Write-Host "[optimize-images-webp] Atlanan dosya: $skipped"
Write-Host "[optimize-images-webp] Basarisiz dosya: $failed"
if (-not $DryRun) {
  $srcMb = [Math]::Round(($srcBytes / 1MB), 2)
  $webpMb = [Math]::Round(($webpBytes / 1MB), 2)
  Write-Host "[optimize-images-webp] Toplam kaynak boyutu: $srcMb MB"
  Write-Host "[optimize-images-webp] Toplam webp boyutu: $webpMb MB"
} else {
  Write-Host '[optimize-images-webp] Dry-run modunda dosya yazilmadi.'
}
