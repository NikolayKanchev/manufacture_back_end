
exports.up = function(knex) {
    return knex.schema
    .createTable('type', function(table){
        table.increments('id').primary();
        table.string('name', 20).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('type');
};
