const { Model, snakeCaseMappers } = require('objection');

class User extends Model {
    static get tableName() {
        return 'user';
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
              from: 'user.base_user_id',
              to: 'base_user.id'
            }
          },
          company: {
            relation: Model.HasOneRelation,
            modelClass: Company,
            join: {
              from: 'user.company_id',
              to: 'company.id'
            }
          }
        };
    }
}

module.exports = User;