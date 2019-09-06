(async function() {
    const fs = require('fs');
    const path = require('path');
    const { promisify } = require('util');
    const write = promisify(fs.writeFile);

    const ENV_PATH = path.join(__dirname, './../..');
    const content = `SKIP_PREFLIGHT_CHECK=true
BROWSER=none`;
    await write(path.join(ENV_PATH, '.env'), content);
})();
