require('dotenv').config();
const Product = require('../models/Product');


exports.getAll = async(req, res, next) => {
    const response = await Product.query();
    res.status(200).send({ ...response });
}
