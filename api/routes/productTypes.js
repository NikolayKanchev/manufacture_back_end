const express = require('express');
const router = express.Router();
const productTypes = require('../controllers/productTypes');

router.get("/:subCatId", productTypes.getByCategoryId);

module.exports = router;