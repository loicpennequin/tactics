(async function() {
    const prompt = require('prompt');
    const fs = require('fs');
    const path = require('path');
    const { promisify } = require('util');
    const read = promisify(fs.readFile);
    const write = promisify(fs.writeFile);

    function setup() {
        const schema = {
            properties: {
                database_host: {
                    default: 'localhost'
                },
                database_name: {
                    default: 'tactics'
                },
                database_user: {
                    default: 'root'
                },
                database_password: {
                    hidden: true,
                    replace: '*',
                    before: value => (value ? value : "''")
                }
            }
        };

        console.log('Please fill in your MySQL credentials :');
        prompt.start();

        prompt.get(schema, async (err, result) => {
            if (err) throw err;
            const ENV_PATH = path.join(__dirname, './../..');

            const sample = (await read(path.join(ENV_PATH, '.env-sample')))
                .toString()
                .split('\n');

            let host = `DB_HOST=${result.database_host}`;
            let name = `DB_NAME=${result.database_name}`;
            let user = `DB_USER=${result.database_user}`;
            let password = `DB_PASSWORD=${result.database_password}`;

            sample[sample.findIndex(line => line.includes('DB_HOST'))] = host;
            sample[sample.findIndex(line => line.includes('DB_NAME'))] = name;
            sample[sample.findIndex(line => line.includes('DB_USER'))] = user;
            sample[
                sample.findIndex(line => line.includes('DB_PASSWORD'))
            ] = password;

            const validationSchema = {
                properties: {
                    confirm: {
                        pattern: /^[yn]/,
                        description: 'Are you sure ? (y/n)',
                        message:
                            "Sorry, I didn't understand that. Please enter y for Yes, or n for No. Are you sure? (y/n)"
                    }
                }
            };
            prompt.start();
            prompt.get(validationSchema, async (arr, result) => {
                if (result.confirm === 'y') {
                    await write(path.join(ENV_PATH, '.env'), sample.join('\n'));
                    console.log('.env file generated.');
                } else {
                    setup();
                }
            });
        });
    }

    setup();
})();
