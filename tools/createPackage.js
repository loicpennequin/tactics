const fs = require('fs');
const path = require('path');

let packageName = process.argv[2];

if (packageName.includes('tactics-')) {
    packageName = packageName.slice(packageName.indexOf('-'));
}

const packagePath = path.join(__dirname, `../packages/tactics-${packageName}`);
const packageJson = `{
    "name": "tactics-${packageName}",
    "version": "1.0.0",
    "description": "${packageName} package for Tactics application",
    "main": "src/index.js",
    "keywords": [],
    "author": "Daria",
    "license": "ISC"
}`;

fs.mkdirSync(path.join(packagePath));
fs.mkdirSync(path.join(packagePath, 'src'));
fs.writeFileSync(path.join(packagePath, 'package.json'), packageJson);

console.log(`Package ${packageName} created successfully.`);
