const { Model, snakeCaseMappers } = require('objection');

class LineProduct extends Model {
    static get tableName() {
        return 'line_product';
    }

    static get relationMappings() {
        const ProductType = require('./ProductType')
        return {
            type: {
                relation: Model.BelongsToOneRelation,
                modelClass: ProductType,
                join: {
                    from: 'product_type.id',
                    to: 'line_product.product_type_id'
                }
            }
        }
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = LineProduct;