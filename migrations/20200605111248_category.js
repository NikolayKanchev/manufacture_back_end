
exports.up = function(knex) {
    return knex.schema
    .createTable('category', function(table){
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.integer('category_id').unsigned().references('category.id').onDelete('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('category');
};
