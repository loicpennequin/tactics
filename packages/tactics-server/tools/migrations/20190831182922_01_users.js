exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments().primary();
        table.timestamps();
        table
            .string('username')
            .unique();
        table
            .string('email')
            .notNullable()
            .unique();
        table.string('password').notNullable();
        table.integer('mmr').notNullable().defaultTo(1200);
        table.integer('gold').notNullable().defaultTo(0);
        table.string('reset_password_token').nullable();
        table.string('reset_password_token_expire').nullable();
        table.string('refresh_token').nullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
