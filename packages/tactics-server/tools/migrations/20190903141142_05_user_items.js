exports.up = function(knex, Promise) {
    return knex.schema.createTable('user_items', table => {
        table.increments().primary();
        table
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table
            .integer('item_id')
            .unsigned()
            .references('id')
            .inTable('heroes')
            .onDelete('CASCADE');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user_items');
};
