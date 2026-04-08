#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const targetDirs = [
  path.join(projectRoot, 'assets', 'characters'),
  path.join(projectRoot, 'assets', 'shop'),
];

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const qualityArg = args.find((arg) => arg.startsWith('--quality='));
const quality = qualityArg ? Number(qualityArg.split('=')[1]) : 80;

const run = (cmd, cmdArgs) => spawnSync(cmd, cmdArgs, { stdio: 'pipe', encoding: 'utf8' });

const hasCwebp = () => run('cwebp', ['-version']).status === 0;
const findFfmpegFromWinget = () => {
  const localAppData = process.env.LOCALAPPDATA;
  if (!localAppData) return null;

  const basePackagesDir = path.join(localAppData, 'Microsoft', 'WinGet', 'Packages');
  if (!fs.existsSync(basePackagesDir)) return null;

  const vendorDirs = fs.readdirSync(basePackagesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.toLowerCase().startsWith('gyan.ffmpeg_'))
    .map((entry) => path.join(basePackagesDir, entry.name));

  for (const vendorDir of vendorDirs) {
    const innerDirs = fs.readdirSync(vendorDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(vendorDir, entry.name));

    for (const innerDir of innerDirs) {
      const candidate = path.join(innerDir, 'bin', 'ffmpeg.exe');
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }

  return null;
};

const resolveFfmpegCmd = () => {
  if (run('ffmpeg', ['-version']).status === 0) return 'ffmpeg';
  const wingetPath = findFfmpegFromWinget();
  if (!wingetPath) return null;
  return run(wingetPath, ['-version']).status === 0 ? wingetPath : null;
};

const walkImages = (dir) => {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkImages(fullPath));
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
};

const convertToWebp = (inputFile, outputFile, converter, ffmpegCmd) => {
  const result = converter === 'cwebp'
    ? run('cwebp', ['-q', String(quality), inputFile, '-o', outputFile])
    : run(ffmpegCmd, ['-y', '-hide_banner', '-loglevel', 'error', '-i', inputFile, '-q:v', String(quality), '-compression_level', '6', outputFile]);
  return result.status === 0;
};

const main = () => {
  const ffmpegCmd = resolveFfmpegCmd();
  const converter = hasCwebp() ? 'cwebp' : ffmpegCmd ? 'ffmpeg' : null;
  if (!converter) {
    console.log('[optimize-images-webp] Donusum araci bulunamadi (cwebp/ffmpeg).');
    console.log('Kurulum: https://developers.google.com/speed/webp/download veya ffmpeg');
    console.log('Ardindan tekrar calistir: npm run optimize:images');
    process.exit(0);
  }
  console.log(`[optimize-images-webp] Donusturucu: ${converter}`);

  const imageFiles = targetDirs.flatMap(walkImages);
  if (imageFiles.length === 0) {
    console.log('[optimize-images-webp] Hedef klasorlerde gorsel bulunamadi.');
    process.exit(0);
  }

  let convertedCount = 0;
  let skippedCount = 0;
  let sourceBytes = 0;
  let outputBytes = 0;

  for (const imageFile of imageFiles) {
    const webpFile = imageFile.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const srcStat = fs.statSync(imageFile);
    sourceBytes += srcStat.size;

    const shouldConvert = !fs.existsSync(webpFile) || fs.statSync(webpFile).mtimeMs < srcStat.mtimeMs;
    if (!shouldConvert) {
      skippedCount += 1;
      outputBytes += fs.statSync(webpFile).size;
      continue;
    }

    if (dryRun) {
      convertedCount += 1;
      continue;
    }

    const ok = convertToWebp(imageFile, webpFile, converter, ffmpegCmd);
    if (ok) {
      convertedCount += 1;
      outputBytes += fs.statSync(webpFile).size;
    } else {
      skippedCount += 1;
      console.log(`[optimize-images-webp] Donusturulemedi: ${imageFile}`);
    }
  }

  const sourceMb = (sourceBytes / 1024 / 1024).toFixed(2);
  const outputMb = (outputBytes / 1024 / 1024).toFixed(2);
  console.log(`[optimize-images-webp] Taranan dosya: ${imageFiles.length}`);
  console.log(`[optimize-images-webp] Donusen dosya: ${convertedCount}`);
  console.log(`[optimize-images-webp] Atlanan dosya: ${skippedCount}`);
  if (!dryRun) {
    console.log(`[optimize-images-webp] Toplam kaynak boyutu: ${sourceMb} MB`);
    console.log(`[optimize-images-webp] Toplam webp boyutu: ${outputMb} MB`);
  } else {
    console.log('[optimize-images-webp] Dry-run modunda dosya yazilmadi.');
  }
};

main();
