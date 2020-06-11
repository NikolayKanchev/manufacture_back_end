const { Model, snakeCaseMappers } = require('objection');

class ManufacturersProducts extends Model {
    static get tableName() {
        return 'manufacturers_products';
    }

    static get relationMappings() {
        const Product = require('./Product')
        return {
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'product.id',
                    to: 'manufacturers_products.product_id'
                }
            }
        }
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = ManufacturersProducts;