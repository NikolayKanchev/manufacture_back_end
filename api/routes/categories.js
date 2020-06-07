const express = require('express');
const router = express.Router();
const categories = require('../controllers/categories');
const populate = require('../populateDB/categories');

router.get("/:type", categories.getAll);
router.post("/add-one", categories.addOne);
router.post("/sub", categories.getSubCategories);


module.exports = router;