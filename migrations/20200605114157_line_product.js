
exports.up = function(knex) {
    return knex.schema
    .createTable('line_product', function(table){
        table.increments('id').primary();
        table.integer('product_id').unsigned().references('product.id').onDelete('CASCADE').notNullable();
        table.integer('project_id').unsigned().references('project.id').onDelete('CASCADE').notNullable();
        table.integer('quantity').notNullable();
        table.decimal('price', 10, 2).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('line_product')
};
