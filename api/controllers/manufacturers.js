require('dotenv').config();
const Manufacturer = require('../models/Manufacturer');


exports.getAll = async(req, res, next) => {
    const response = await Manufacturer.query();
    res.status(200).send({ ...response });
}
