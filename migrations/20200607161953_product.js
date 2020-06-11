
exports.up = function(knex) {
    return knex.schema
    .createTable('product', function(table){
        table.increments('id').primary();
        table.integer('product_type_id').unsigned().references('product_type.id').onDelete('CASCADE').notNullable();
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
