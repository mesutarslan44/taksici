# Asset Optimization Pipeline

Bu dokuman, uygulama boyutunu dusurmek ve D1 indirme/acilis oranlarini iyilestirmek icin WebP pipeline adimlarini tanimlar.

## 1) Hazirlik

- `ffmpeg` aracini sisteme kur.
- Kurulumdan sonra terminalden `ffmpeg -version` calistigini dogrula.
- Alternatif olarak `winget install Gyan.FFmpeg` kullanabilirsin.

## 2) Dry-run

```bash
npm run optimize:images:dry
```

Bu adim donusecek dosyalari kontrol eder, dosya yazmaz.

## 3) Donusum

```bash
npm run optimize:images
```

- `assets/characters` ve `assets/shop` altindaki `png/jpg/jpeg` dosyalari `.webp` olarak uretilir.
- Kaynaktan yeni olan dosyalar tekrar donusturulur.

## 4) Uygulamaya gecis

- Referanslari `.webp` uzantilarina gecir.
- QA testinden sonra gereksiz eski bitmapleri temizle.

## 5) Release dogrulama

```bash
npm run release:check
npm run release:check:strict
```

- `release:check`: hizli guvenlik + varlik tutarliligi kontrolu.
- `release:check:strict`: ek olarak Android Expo export testi.

## 6) Hedef metrikler

- `assets/characters` + `assets/shop` kaynaklarinda yaklasik `70.20 MB -> 5.02 MB` WebP cikti boyutu.
- Ilk acilis ve bundle indirme suresinde gozle gorulur iyilesme.
