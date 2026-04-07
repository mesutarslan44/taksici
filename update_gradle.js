const fs = require('fs');
const path = require('path');

const gradlePath = path.join('android', 'app', 'build.gradle');
console.log(`Reading gradle file from: ${gradlePath}`);

try {
    let content = fs.readFileSync(gradlePath, 'utf8');

    // 1. signingConfigs bloğunu güncelle
    // Mevcut debug bloğunun yanına release bloğunu ekle
    if (!content.includes("keyAlias System.getenv('TAKSICI_UPLOAD_KEY_ALIAS') ?: 'taksici-key'")) {
        console.log("Adding release signing config...");
        const signingRegex = /(signingConfigs\s*\{\s*debug\s*\{[\s\S]*?\}\s*\})/;
        const releaseConfig = `
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        release {
            storeFile file(System.getenv('TAKSICI_UPLOAD_STORE_FILE') ?: 'taksici-release.keystore')
            storePassword System.getenv('TAKSICI_UPLOAD_STORE_PASSWORD') ?: ''
            keyAlias System.getenv('TAKSICI_UPLOAD_KEY_ALIAS') ?: 'taksici-key'
            keyPassword System.getenv('TAKSICI_UPLOAD_KEY_PASSWORD') ?: ''
        }
    }`;

        // Eğer regex eşleşmezse manuel ekleme dene
        if (signingRegex.test(content)) {
            content = content.replace(signingRegex, releaseConfig.trim());
        } else {
            console.error("Could not find signingConfigs block to replace.");
        }
    } else {
        console.log("Release signing config already present.");
    }

    // 2. release buildType içinde signingConfig'i güncelle
    if (content.includes("signingConfig signingConfigs.debug") && content.includes("release {")) {
        console.log("Updating release buildType signing config...");
        // Sadece release bloğu içindeki debug'ı release yapmalıyız.
        // Basit replace tümünü değiştirebilir, dikkatli olalım.
        // Ancak debug bloğu da signingConfigs.debug kullanıyor.

        // Strateji: release bloğunu bul ve içindeki signingConfig satırını değiştir.
        const releaseBuildTypeRegex = /(buildTypes\s*\{[\s\S]*?release\s*\{[\s\S]*?)signingConfig\s+signingConfigs\.debug([\s\S]*?\})/;

        if (releaseBuildTypeRegex.test(content)) {
            content = content.replace(releaseBuildTypeRegex, '$1signingConfig signingConfigs.release$2');
        } else {
            console.log("Could not find signingConfig signingConfigs.debug inside release block (maybe already updated or structured differently).");
        }
    }

    fs.writeFileSync(gradlePath, content);
    console.log("Success: build.gradle updated.");

} catch (e) {
    console.error("Error updating build.gradle:", e);
}
