require('dotenv').config();
const Product = require('../models/Product');
const ProductType = require('../models/ProductType');


exports.getAll = async(req, res, next) => {
    const { subCatId } = req.params;
    const type = await ProductType.query().select().where({ categoryId: subCatId });
    const response = await Product.query().select().where({ productTypeId: type[0].id });
    res.status(200).send({ ...response });
}

exports.getManufacturersProducts = async(req, res, next) => {
    const { id } = req.params;
    const products = await Product.query().select().where({ manufacturerId: id }).withGraphFetched('type');    
    res.status(200).json({ products });
}

exports.addOne = async (req, res, next) => {
    const { product } = req.body;

    let type = (await ProductType.query().select().where({ 
        categoryId: product.type.categoryId, name: product.type.name }))[0];
    if (type === undefined){
        type = await ProductType.query().insert({ 
            categoryId: product.type.categoryId, 
            name: product.type.name, desc: product.type.desc 
        });        
    }
    await Product.query().insert({
        manufacturerId: product.manufacturerId,
        productTypeId: type.id, minOrder: product.minOrder, 
        unitType: product.unitType, capacity: product.capacity, 
        capacityPeriod: product.capacityPeriod 
    }).then(
            res.status(200).send({ message: "OK" })
    );
}
