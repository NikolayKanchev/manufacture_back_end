
exports.up = function(knex) {
    return knex.schema
    .createTable('offer', function(table){
        table.increments('id').primary();
        table.integer('project_id').unsigned().references('project.id').onDelete('CASCADE').notNullable();
        table.integer('manufacturer_id').unsigned().references('manufacturer.id').onDelete('CASCADE').notNullable();
        table.string('offer_num', 50).notNullable();
        table.string('text', 1000).notNullable();
        table.date('valid_to').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('offer')
};
