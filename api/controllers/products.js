require('dotenv').config();
const Product = require('../models/Product');
const ProductType = require('../models/ProductType');


exports.getAll = async(req, res, next) => {
    const {subCatId} = req.params;
    const type = await ProductType.query().select().where({ categoryId: subCatId });
    const response = await Product.query().select().where({ productTypeId: type[0].id });
    res.status(200).send({ ...response });
}
