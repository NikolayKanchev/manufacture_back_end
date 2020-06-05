
exports.up = function(knex) {
    return knex.schema
    .createTable('detail', function(table){
        table.increments('id').primary();
        table.integer('type_id').unsigned().references('type.id').onDelete('CASCADE').notNullable();
        table.string('name', 20).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('detail');
};
