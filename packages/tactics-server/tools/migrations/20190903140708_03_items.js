exports.up = function(knex, Promise) {
    return knex.schema.createTable('items', table => {
        table.increments().primary();
        table.integer('type').notNullable();
        table
            .string('name')
            .notNullable()
            .unique();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('items');
};
