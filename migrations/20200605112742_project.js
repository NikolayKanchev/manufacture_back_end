
exports.up = function(knex) {
    return knex.schema
    .createTable('project', function(table){
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('user.id').onDelete('CASCADE').notNullable();
        table.string('name', 100).notNullable();
        table.string('desc', 1000).notNullable();
        table.boolean('offers_requested').notNullable().defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('project')
};
