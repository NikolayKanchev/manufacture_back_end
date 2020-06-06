const { Model, snakeCaseMappers } = require('objection');

class Detail extends Model {
    static get tableName() {
        return 'detail';
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = Detail;