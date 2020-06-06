
exports.up = function(knex) {
    return knex.schema
    .createTable('product', function(table){
        table.increments('id').primary();
        table.integer('category_id').unsigned().references('category.id').onDelete('CASCADE').notNullable();
        table.string('name', 50).notNullable();
        table.string('desc', 1000).notNullable();
        table.integer('min_order').notNullable();
        table.string('unit_type', 20).notNullable();
        table.integer('capacity').notNullable();
        table.string('capacity_period', 100).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('product')
};