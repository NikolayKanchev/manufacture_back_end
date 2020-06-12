
exports.up = function(knex) {
    return knex.schema
    .createTable('manufacturers_products', function(table){
        table.integer('manufacturer_id').unsigned().references('manufacturer.id').onDelete('CASCADE').notNullable();
        table.integer('product_id').unsigned().references('product.id').onDelete('CASCADE').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('manufacturers_products');
};
