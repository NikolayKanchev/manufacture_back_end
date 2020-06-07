require('dotenv').config();
const Product = require('../models/Product');


exports.getAll = async(req, res, next) => {
    const {subCatId} = req.params;
    const response = await Product.query().select().where({ categoryId: subCatId });
    res.status(200).send({ ...response });
}
