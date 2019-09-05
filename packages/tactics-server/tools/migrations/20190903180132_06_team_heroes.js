exports.up = async function(knex, Promise) {
    await knex.schema.createTable('teams', table => {
        table.increments().primary();

        table
            .integer('hero1_id')
            .unsigned();
            
        table
            .integer('hero2_id')
            .unsigned();
            
        table
            .integer('hero3_id')
            .unsigned();
            
    });
    
    return knex.schema.createTable('team_heroes', table => {
        table.increments().primary();
        table
            .integer('hero_id')
            .unsigned()
            .nullable()
            .references('id')
            .inTable('heroes')
            .onDelete('CASCADE');          
        table
            .integer('weapon_id')
            .unsigned()
            .nullable()
            .references('id')
            .inTable('items')
            .onDelete('CASCADE');        
        table
            .integer('armor_id')
            .unsigned()
            .nullable()
            .references('id')
            .inTable('items')
            .onDelete('CASCADE');        
        table
            .integer('trinket_id')
            .unsigned()
            .nullable()
            .references('id')
            .inTable('items')
            .onDelete('CASCADE');    
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTableIfExists('team_heroes');
    return knex.schema.dropTableIfExists('teams');
};
