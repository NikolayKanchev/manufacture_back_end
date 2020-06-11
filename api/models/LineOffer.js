const { Model, snakeCaseMappers } = require('objection');

class LineOffer extends Model {
    static get tableName() {
        return 'line_offer';
    }

    static get relationMappings() {
        const Offer = require('./Offer')
        return {
            type: {
                relation: Model.BelongsToOneRelation,
                modelClass: Offer,
                join: {
                    from: 'line_offer.offer_id',
                    to: 'offer.id'
                }
            }
        }
    }

    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = LineOffer;