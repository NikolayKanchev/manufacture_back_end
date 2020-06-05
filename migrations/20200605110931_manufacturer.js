
exports.up = function(knex) {
    return knex.schema
    .createTable('manufacturer', function(table){
        table.increments('id').primary();
        table.integer('base_user_id').unsigned().references('base_user.id').onDelete('CASCADE').notNullable();
        table.integer('company_id').unsigned().references('company.id').onDelete('CASCADE').notNullable();
        table.string('contact_person').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('manufacturer')
};
