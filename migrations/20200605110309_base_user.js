
exports.up = function(knex) {
    return knex.schema
    .createTable('base_user', function(table){
        table.increments('id').primary();
        table.string('email', 100).notNullable();
        table.string('password', 500).notNullable();
        table.boolean('is_manufacturer').notNullable().defaultTo(false);
        table.integer('plan_id').unsigned().references('plan.id').onDelete('CASCADE').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('base_user')
};
