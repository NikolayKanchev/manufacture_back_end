const { Model, snakeCaseMappers } = require('objection');

class Product extends Model {
    static get tableName() {
        return 'product';
    }

    static get relationMappings() {
        const ProductType = require('./ProductType');

        return {
          type: {
            relation: Model.HasOneRelation,
            modelClass: ProductType,
            join: {
              from: 'product.product_type_id',
              to: 'product_type.id'
            }
          }
        };
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = Product;