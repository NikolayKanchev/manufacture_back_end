const { Model, snakeCaseMappers } = require('objection');

class Project extends Model {
    static get tableName() {
        return 'project';
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = Project;