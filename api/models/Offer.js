const { Model, snakeCaseMappers } = require('objection');

class Offer extends Model {
    static get tableName() {
        return 'offer';
    }

    static get relationMappings() {
        const LineOffer = require('./LineProduct')
        return {
            lines: {
                relation: Model.HasManyRelation,
                modelClass: LineOffer,
                join: {
                    from: 'offer.id',
                    to: 'line_offer.offer_id'
                }
            }
        }
    }  

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = Offer;