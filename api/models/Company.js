const { Model, snakeCaseMappers } = require('objection');

class Company extends Model {
    static get tableName() {
        return 'company';
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = Company;