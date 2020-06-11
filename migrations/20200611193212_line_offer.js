
exports.up = function(knex) {
    return knex.schema
    .createTable('line_offer', function(table){
        table.integer('offer_id').unsigned().references('offer.id').onDelete('CASCADE').notNullable();
        table.integer('line_product_id').unsigned().references('line_product.id').onDelete('CASCADE').notNullable();
        table.decimal('price', 8, 2).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('line_offer')
};
