const { Model, snakeCaseMappers } = require('objection');

class Product extends Model {
    static get tableName() {
        return 'product';
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = Product;