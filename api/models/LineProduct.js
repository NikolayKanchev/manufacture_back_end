const { Model, snakeCaseMappers } = require('objection');

class LineProduct extends Model {
    static get tableName() {
        return 'line_product';
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = LineProduct;