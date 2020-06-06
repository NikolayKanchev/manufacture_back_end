require('dotenv').config();
const Detail = require('../models/Detail');


exports.getAll = async(req, res, next) => {
    const response = await Detail.query();
    res.status(200).send({ ...response });
}
