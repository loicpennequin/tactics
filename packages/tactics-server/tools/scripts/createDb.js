const path = require('path');
const mysql = require('mysql');
const chalk = require('chalk');
const dotenv = require('dotenv');
dotenv.config();

const connexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

if (!process.env.DB_NAME) {
    const envPath = chalk.bold.white('.env');

    console.log(
        chalk.red(`
The database has not been created because your .env configuration is incorrect. Please check the file located at ${envPath}
    `)
    );
    process.exit();
} else {
    connexion.connect(err => {
        if (err) throw err;
        console.log('Connected to MySQL.');
        console.log('Creating Database...');
        const sql = `DROP DATABASE IF EXISTS ${process.env.DB_NAME}`;
        connexion.query(sql, (err, result) => {
            if (err) throw err;
            const sql = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;
            connexion.query(sql, (err, result) => {
                if (err) throw err;
                console.log(
                    chalk.bold('Database created. Making migrations...')
                );
                const knex = require('knex')({
                    client: 'mysql',
                    connection: {
                        host: process.env.DB_HOST,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME
                    },
                });
                knex.migrate
                    .latest({
                        directory: path.join(__dirname, '../migrations')
                    })
                    .then(() => {
                        if (process.argv.includes('--noseed')) {
                            console.log(
                                chalk.bold(
                                    '--noseed argument provided. Skipping migrations...'
                                )
                            );
                            process.exit();
                        }

                        console.log(
                            chalk.bold(
                                'Migrations successful. Seeding database...'
                            )
                        );
                        return knex.seed.run({
                            directory: path.join(__dirname, '../seeds')
                        });
                    })
                    .then(() => {
                        console.log(
                            chalk.green(
                                chalk.bold('Seeding successful. all done !')
                            )
                        );
                        process.exit();
                    });
            });
        });
    });
}
