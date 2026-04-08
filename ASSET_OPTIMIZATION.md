# Asset Optimization Pipeline

Bu dokuman, uygulama boyutunu dusurmek ve D1 indirme/acilis oranlarini iyilestirmek icin WebP pipeline adimlarini tanimlar.

## 1) Hazirlik

- `ffmpeg` aracini sisteme kur.
- Kurulumdan sonra terminalden `ffmpeg -version` calistigini dogrula.
- Alternatif: `winget install Gyan.FFmpeg`.

## 2) Dry-run

```bash
npm run optimize:images:dry
```

Bu adim donusecek dosyalari kontrol eder, dosya yazmaz.

## 3) Donusum

```bash
npm run optimize:images
```

Bu komut su varliklari kapsar:
- `assets/characters/*`
- `assets/shop/*`
- `assets/bg_rain_dark.png`
- `assets/turk_cayi.png`
- `assets/turk_kahvesi.png`

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

## 6) Olculen Sonuc

- Karakter + shop havuzu: `70.20 MB -> 5.02 MB`
- Heavy UI gorselleri: `4.59 MB -> 0.16 MB`
- Toplam optimize edilen set: `74.79 MB -> 5.18 MB`
