require('dotenv').config();
const Category = require('../models/Category');


exports.getAll = async (req, res, next) => {
    const {type} = req.params;
    let response = "";
    
    if (type === "categories"){
        response = await Category.query().select().whereNull('categoryId');
    }else{
        response = await Category.query().select().whereNotNull('categoryId');
    }
    res.status(200).send({ ...response });
}

exports.getSubCategories = async (req, res, next) => {
    const { category } = req.body;

    const response = await Category.query().select().where({categoryId: category});    
    res.status(200).send({ ...response });
}

exports.addOne = async (req, res, next) => {
    const category = req.body.category;

    console.log(category);

    // const notExists =  (await Category.query()).length === 0 ? true : false;

    // if (notExists){
    //     const response = await Category.query().cou.insert(category);
    //     res.status(200).send({ ...response });
    // }
    
    
}