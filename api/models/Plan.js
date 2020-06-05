const { Model, snakeCaseMappers } = require('objection');

class Plan extends Model {
    static get tableName() {
        return 'plan';
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = Plan;