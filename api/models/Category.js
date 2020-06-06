const { Model, snakeCaseMappers } = require('objection');

class Category extends Model {
    static get tableName() {
        return 'category';
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = Category;