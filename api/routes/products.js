const express = require('express');
const router = express.Router();
const products = require('../controllers/products');

router.get("/:subCatId", products.getAll);
router.get("/man-products/:id", products.getManufacturersProducts)
router.post("/addOne", products.addOne)

module.exports = router;