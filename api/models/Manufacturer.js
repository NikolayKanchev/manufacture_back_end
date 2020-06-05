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
          }
        };
    }
}

module.exports = Manufacturer;