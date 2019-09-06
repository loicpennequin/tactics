import fs from 'fs';
import path from 'path';
import { arrayToObject } from 'tactics-common';

export function requireDirectory(dirname, toRemove) {
    return arrayToObject(
        fs.readdirSync(path.join(dirname)).filter(file => {
            return file.indexOf('.') !== 0 && file !== 'index.js';
        }),
        file => file.slice(0, file.indexOf(toRemove)),
        file => require(path.join(dirname, file)).default
    );
}
