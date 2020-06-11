require('dotenv').config();
const Offer = require('../models/Offer');
const LineOffer = require('../models/LineOffer');

exports.sendOffer = async (req, res, next) => {
    
    const { projectId, manufacturerId, validTo, text, lines } = req.body.offer;

    const createdOffer = await Offer.query().insert({ projectId, manufacturerId, validTo, text });

    lines.map( async (line) => {
        const { lineProductId, price } = line;
        await LineOffer.query().insert({ offerId: createdOffer.id, lineProductId, price })
    })

    res.status(200).send({ message: "OK" });
}
