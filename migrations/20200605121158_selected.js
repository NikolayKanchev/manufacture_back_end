
exports.up = function(knex) {
    return knex.schema
    .createTable('selected', function(table){
        table.integer('product_id').unsigned().references('product.id').onDelete('CASCADE').notNullable();
        table.integer('detail_id').unsigned().references('detail.id').onDelete('CASCADE').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('selected');
};
