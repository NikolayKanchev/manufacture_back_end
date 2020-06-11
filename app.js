const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Knex = require("knex");
const knexConfig = require("./knexfile.js");
const objection = require("objection");
const Model = objection.Model;
const knex = Knex(knexConfig.development);
// const populateDB = require("./api/populateDB/categories");


const usersRoutes = require('./api/routes/users');
const plansRoutes = require('./api/routes/plans');
const projectsRoutes = require('./api/routes/projects');
const categoriesRoutes = require('./api/routes/categories');
const productsRoutes = require('./api/routes/products');
const manufacturersRoutes = require('./api/routes/manufacturers');
const productTypesRouts = require('./api/routes/productTypes');
const offersRouts = require('./api/routes/offers');


require('dotenv').config();

app.use( '/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
Model.knex(knex);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/users', usersRoutes);
app.use('/plans', plansRoutes);
app.use('/projects', projectsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/products', productsRoutes);
app.use('/product-types', productTypesRouts);
app.use('/manufacturers', manufacturersRoutes);
app.use('/offers', offersRouts);


app.use((req, res, next) =>{
    const error = new Error('Not found !');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// (function() {

//     populateDB.addCategories();
// })()

module.exports = app;