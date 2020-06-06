require('dotenv').config();
const Plan = require('../models/Plan');


exports.getPlans = async(req, res, next) => {
    const response = await Plan.query().select().where({ text: req.params.type });
    res.status(200).send({ ...response });
}
