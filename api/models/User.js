const { Model, snakeCaseMappers } = require('objection');

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: {type: "string"},
                firstName: {type: "string"},
                lastName: {type: "string"},
                email: {type: "string"},
                password: {type: "string"},
            }
        }        
    }
}

module.exports = User;