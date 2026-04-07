const fs = require('fs');
const path = require('path');

const gradlePath = path.join('android', 'app', 'build.gradle');
console.log(`Reading gradle file from: ${gradlePath}`);

try {
    let content = fs.readFileSync(gradlePath, 'utf8');

    // 1. signingConfigs bloğuna release ekle (debug'dan hemen sonra)
    const debugBlockEndRegex = /(signingConfigs\s*\{[\s\S]*?debug\s*\{[\s\S]*?\}\s*)/;
    const releaseConfig = `
        release {
            storeFile file(System.getenv('TAKSICI_UPLOAD_STORE_FILE') ?: 'taksici-release.keystore')
            storePassword System.getenv('TAKSICI_UPLOAD_STORE_PASSWORD') ?: ''
            keyAlias System.getenv('TAKSICI_UPLOAD_KEY_ALIAS') ?: 'taksici-key'
            keyPassword System.getenv('TAKSICI_UPLOAD_KEY_PASSWORD') ?: ''
        }
    `;

    if (!content.includes("keyAlias System.getenv('TAKSICI_UPLOAD_KEY_ALIAS') ?: 'taksici-key'")) {
        if (debugBlockEndRegex.test(content)) {
            content = content.replace(debugBlockEndRegex, '$1' + releaseConfig);
            console.log("Added release signing config.");
        } else {
            console.error("Could not find signingConfigs debug block.");
        }
    } else {
        console.log("Release config already present.");
    }

    // 2. release buildType güncelle
    // signingConfig signingConfigs.debug -> signingConfig signingConfigs.release
    // Ancak sadece release bloğu içinde!

    // release bloğunu bul
    const releaseBuildTypeRegex = /buildTypes\s*\{[\s\S]*?release\s*\{([\s\S]*?)\}/;
    const match = content.match(releaseBuildTypeRegex);

    if (match) {
        let releaseBlock = match[1];
        if (releaseBlock.includes('signingConfig signingConfigs.debug')) {
            const newReleaseBlock = releaseBlock.replace('signingConfig signingConfigs.debug', 'signingConfig signingConfigs.release');
            content = content.replace(releaseBlock, newReleaseBlock);
            console.log("Updated release buildType signing config.");
        } else {
            console.log("signingConfig signingConfigs.debug not found in release block (or already updated).");
        }
    } else {
        console.error("Could not find release buildType block.");
    }

    fs.writeFileSync(gradlePath, content, 'utf8');
    console.log("Success: build.gradle updated.");

} catch (e) {
    console.error("Error updating build.gradle:", e);
    process.exit(1);
}
