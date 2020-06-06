const { Model, snakeCaseMappers } = require('objection');

class Type extends Model {
    static get tableName() {
        return 'type';
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = Type;