
exports.up = function(knex) {
    return knex.schema
    .createTable('product_type', function(table){
        table.increments('id').primary();
        table.integer('category_id').unsigned().references('category.id').onDelete('CASCADE').notNullable();
        table.string('name', 50).notNullable();
        table.string('desc', 1000).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('product_type')
};
