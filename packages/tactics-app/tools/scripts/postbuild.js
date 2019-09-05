const fs = require('fs');
const path = require('path');
const pjson = require('../../package.json');

const VERSION = pjson.version;
const SETUP_FILE_PATH = path.join(
    __dirname,
    `../../dist/tactics_installer_${VERSION}.exe`
);
const SERVER_PUBLIC_PATH = path.join(
    __dirname,
    `../../../tactics-server/public/installer/tactics_installer_latest.exe`
);

fs.copyFile(SETUP_FILE_PATH, SERVER_PUBLIC_PATH, err => {
    if (err) throw err;
    process.exit(0);
});
