require('dotenv').config();
const Category = require('../models/Category');


exports.getAll = async(req, res, next) => {
    const response = await Category.query();
    res.status(200).send({ ...response });
}
