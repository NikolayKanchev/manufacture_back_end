
exports.up = function(knex) {
    return knex.schema
    .createTable('user', function(table){
        table.increments('id').primary();
        table.integer('base_user_id').unsigned().references('base_user.id').onDelete('CASCADE').notNullable();
        table.integer('company_id').unsigned().references('company.id').onDelete('CASCADE');
        table.string('name', 100).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('user');
};
