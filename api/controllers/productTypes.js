require('dotenv').config();
const Product = require('../models/Product');
const ProductType = require('../models/ProductType');


exports.getByCategoryId = async(req, res, next) => {
    const {subCatId} = req.params;
    const response = await ProductType.query().select().where({ categoryId: subCatId });
    res.status(200).send({ ...response });
}
