
exports.up = function(knex) {
    return knex.schema
    .createTable('line_product', function(table){
        table.increments('id').primary();
        table.integer('project_id').unsigned().references('project.id').onDelete('CASCADE').notNullable();
        table.integer('product_type_id').unsigned().references('product_type.id').onDelete('CASCADE').notNullable();
        table.integer('quantity').notNullable();
        table.string('how_often', 20).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('line_product')
};
