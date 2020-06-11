require('dotenv').config();
const Product = require('../models/Product');
const ProductType = require('../models/ProductType');
const ManufacturersProducts = require('../models/ManufacturersProducts');


exports.getAll = async(req, res, next) => {
    const { subCatId } = req.params;
    const type = await ProductType.query().select().where({ categoryId: subCatId });
    const response = await Product.query().select().where({ productTypeId: type[0].id });
    res.status(200).send({ ...response });
}

exports.getManufacturersProducts = async(req, res, next) => {
    const { id } = req.params;    
    const response = await ManufacturersProducts.query()
        .select().where({ manufacturerId: id })
        .withGraphFetched('product');
    
    const loopTrueObjects = () => {
        const promises = []; 

        response.map( async (p) => {
            promises.push(new Promise(async (resolve) => {
                p.product.type = await ProductType.query()
                    .findById(p.product.productTypeId);
                resolve(p);
            }))
        })

        Promise.all(promises)
        .then((products) => {                                         
            res.status(200).json({ products });
        })
        .catch((e) => {
            console.log(e);
        });
    }
    
    loopTrueObjects();
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
    const newProduct = await Product.query().insert({ 
        productTypeId: type.id, minOrder: product.minOrder, 
        unitType: product.unitType, capacity: product.capacity, 
        capacityPeriod: product.capacityPeriod 
    });        
    const newLine = await ManufacturersProducts.query().insert({ 
        manufacturerId: product.manufacturerId, productId: newProduct.id });        
    res.status(200).send({ message: "OK" });
}
