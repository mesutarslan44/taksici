# Asset Optimization Pipeline

Bu dokuman, uygulama boyutunu dusurmek ve D1 indirme/acilis oranlarini iyilestirmek icin WebP pipeline adimlarini tanimlar.

## 1) Hazirlik

- `cwebp` aracini sisteme kur.
- Kurulumdan sonra terminalden `cwebp -version` calistigini dogrula.

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

- Kritik buyuk dosyalardan baslayarak importlari `.webp` uzantilarina gecir.
- QA testinden sonra gereksiz eski bitmapleri temizle.

## 5) Hedef metrikler

- `assets/characters` toplam boyutunda `%30+` iyilesme.
- Ilk acilis ve ilk bundle indirme suresinde gozle gorulur iyilesme.
