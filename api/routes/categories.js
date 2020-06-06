const express = require('express');
const router = express.Router();
const categories = require('../controllers/categories');
const populate = require('../populateDB/categories');

router.get("/", categories.getAll);
router.post("/add-one", categories.addOne);

module.exports = router;