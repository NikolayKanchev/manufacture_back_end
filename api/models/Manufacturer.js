const { Model, snakeCaseMappers } = require('objection');

class Manufacturer extends Model {
    static get tableName() {
        return 'manufacturer';
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static get relationMappings() {
        const BaseUser = require('./BaseUser');
        const Company = require('./Company');
        const Offer = require('./Offer');
        const Product = require('./Product');

        return {
          baseUser: {
            relation: Model.HasOneThroughRelation,
            modelClass: BaseUser,
            join: {
              from: 'manufacturer.base_user_id',
              to: 'base_user.id'
            }
          },
          company: {
            relation: Model.HasOneRelation,
            modelClass: Company,
            join: {
              from: 'manufacturer.company_id',
              to: 'company.id'
            }
          },
          offers: {
            relation: Model.HasManyRelation,
            modelClass: Offer,
            join: {
                from: 'manufacturer.id',
                to: 'offer.manufacturer_id'
            }
          },
          products: {
            relation: Model.HasManyRelation,
            modelClass: Product,
            join: {
                from: 'manufacturer.id',
                to: 'product.manufacturer_id'
            }
          }
        };
    }
}

module.exports = Manufacturer;