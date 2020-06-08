const { Model, snakeCaseMappers } = require('objection');

class ProductType extends Model {
    static get tableName() {
        return 'product_type';
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = ProductType;