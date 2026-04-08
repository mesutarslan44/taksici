param(
  [switch]$StrictExport
)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$failures = 0

function Pass([string]$message) {
  Write-Host "[PASS] $message" -ForegroundColor Green
}

function Warn([string]$message) {
  Write-Host "[WARN] $message" -ForegroundColor Yellow
}

function Fail([string]$message) {
  Write-Host "[FAIL] $message" -ForegroundColor Red
  $script:failures += 1
}

Write-Host "[release-check] Project: $projectRoot"

# 1) Tracked sensitive files
$trackedFiles = git -C $projectRoot ls-files
$trackedSensitive = $trackedFiles | Where-Object {
  $_ -match '(?i)\.(keystore|jks|p12|pfx|pem|key)$' -or
  $_ -match '(?i)(^|/)google-services\.json$' -or
  $_ -match '(?i)(^|/)GoogleService-Info\.plist$' -or
  $_ -match '(?i)(^|/)keystore\.properties$'
}

if ($trackedSensitive.Count -gt 0) {
  Fail "Tracked sensitive files detected: $($trackedSensitive -join ', ')"
} else {
  Pass 'No tracked keystore/certificate secrets found.'
}

# 2) Android signing config sanity checks
$gradlePath = Join-Path $projectRoot 'android\app\build.gradle'
if (-not (Test-Path $gradlePath)) {
  Fail 'android/app/build.gradle not found.'
} else {
  $gradleContent = Get-Content -Path $gradlePath -Raw

  if ($gradleContent -match 'keystoreProperties' -and
      $gradleContent -match "TAKSICI_UPLOAD_STORE_FILE" -and
      $gradleContent -match "TAKSICI_UPLOAD_STORE_PASSWORD" -and
      $gradleContent -match "TAKSICI_UPLOAD_KEY_ALIAS" -and
      $gradleContent -match "TAKSICI_UPLOAD_KEY_PASSWORD") {
    Pass 'Release signing reads keystore.properties/env variables.'
  } else {
    Fail 'Release signing does not appear to be fully env/keystore.properties driven.'
  }

  if ($gradleContent -match "storeFile\s+file\('taksici-release\.keystore'\)") {
    Fail 'Hardcoded release keystore path found in build.gradle.'
  } else {
    Pass 'No hardcoded release keystore path in build.gradle.'
  }

  if ($gradleContent -match "release\s*\{[\s\S]*storePassword\s+'(?!android)" -or
      $gradleContent -match "release\s*\{[\s\S]*keyPassword\s+'(?!android)") {
    Fail 'Possible hardcoded release signing password found in build.gradle.'
  } else {
    Pass 'No obvious hardcoded release signing password in build.gradle.'
  }
}

# 3) WebP reference checks for heavy asset pools
$assetFiles = @(
  (Join-Path $projectRoot 'passengers.js'),
  (Join-Path $projectRoot 'shopItems.js')
)

foreach ($file in $assetFiles) {
  if (-not (Test-Path $file)) {
    Fail "Missing file: $file"
    continue
  }

  $text = Get-Content -Path $file -Raw
  $legacyMatches = [regex]::Matches($text, "assets/(characters|shop)/[a-zA-Z0-9_]+\.(png|jpg|jpeg)")
  if ($legacyMatches.Count -gt 0) {
    Fail "Legacy bitmap refs remain in $(Split-Path $file -Leaf): $($legacyMatches.Count)"
  } else {
    Pass "No legacy characters/shop bitmap refs in $(Split-Path $file -Leaf)."
  }

  $webpMatches = [regex]::Matches($text, "assets/(characters|shop)/[a-zA-Z0-9_]+\.webp")
  if ($webpMatches.Count -eq 0) {
    Fail "No WebP refs found in $(Split-Path $file -Leaf)."
  } else {
    Pass "WebP refs found in $(Split-Path $file -Leaf): $($webpMatches.Count)"
  }
}

# 4) Optional strict export
if ($StrictExport) {
  Write-Host '[release-check] Strict mode: running Expo Android export.'
  Push-Location $projectRoot
  try {
    npx expo export --platform android --no-minify --output-dir .expo-export-check
    if ($LASTEXITCODE -ne 0) {
      Fail 'Expo export failed in strict mode.'
    } else {
      Pass 'Expo export completed in strict mode.'
    }
  } catch {
    Fail "Expo export threw an error: $($_.Exception.Message)"
  } finally {
    if (Test-Path (Join-Path $projectRoot '.expo-export-check')) {
      Remove-Item -Recurse -Force -LiteralPath (Join-Path $projectRoot '.expo-export-check')
    }
    Pop-Location
  }
} else {
  Warn 'Strict export skipped. Run npm run release:check:strict before release.'
}

if ($failures -gt 0) {
  Write-Host "[release-check] Completed with $failures failure(s)." -ForegroundColor Red
  exit 1
}

Write-Host '[release-check] All checks passed.' -ForegroundColor Green
exit 0
