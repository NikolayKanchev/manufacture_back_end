exports.up = function(knex) {
    return knex.schema
    .createTable('plan', function(table){
        table.increments('id').primary();
        table.string('title', 25).notNullable();
        table.decimal("price",8,2).notNullable();
        table.string('currency', 25).notNullable();
        table.string('period', 25).notNullable();
        table.string('options', 500).notNullable();
        table.string('text').notNullable();
        table.boolean('best_value').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('plan');
};