const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
    await knex('users').insert({
        username: 'Daria',
        email: 'daria@gmail.com',
        password: bcrypt.hashSync('azerty', 12)
    });

    await knex('heroes').insert([
        {name: 'Wizard'},
        {name: 'Knight'},
        {name: 'Hunter'},
    ]);
    
    await knex('items').insert([
        {name: 'Sword', type: 0},
        {name: 'Shielf', type: 1},
        {name: 'Necklace', type: 2},
    ]);
};
