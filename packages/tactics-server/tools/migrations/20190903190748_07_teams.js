exports.up = function(knex, Promise) {
    return knex.schema.table('teams', table => {
        table.string('name').notNullable();
        table
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('team');
};
