
exports.up = function(knex) {
    return knex.schema
    .createTable('company', function(table){
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('reg_number', 100).notNullable();
        table.string('address').notNullable();
        table.string('country', 50).notNullable();
        table.string('img');
        table.string('phone', 50).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('company')
};
