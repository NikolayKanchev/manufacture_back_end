const { Model, snakeCaseMappers } = require('objection');

class BaseUser extends Model {
    static get tableName() {
        return 'base_user';
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static get relationMappings() {
        const Plan = require('./Plan')
        return {
          plan: {
            relation: Model.HasOneRelation,
            modelClass: Plan,
            join: {
              from: 'base_user.plan_id',
              to: 'plan.id'
            }
          }
        };
    }

    // static get jsonSchema() {
    //     return {
    //         type: 'object',

    //         properties: {
    //             id: {type: "string"},
    //             firstName: {type: "string"},
    //             lastName: {type: "string"},
    //             email: {type: "string"},
    //             password: {type: "string"},
    //         }
    //     }        
    // }
}

module.exports = BaseUser;