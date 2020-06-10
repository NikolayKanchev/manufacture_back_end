const { Model, snakeCaseMappers } = require('objection');

class Project extends Model {
    static get tableName() {
        return 'project';
    }

    static get relationMappings() {
        const LineProduct = require('./LineProduct')
        return {
            lines: {
                relation: Model.HasManyRelation,
                modelClass: LineProduct,
                join: {
                    from: 'project.id',
                    to: 'line_product.project_id'
                }
            }
        }
    }  

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = Project;