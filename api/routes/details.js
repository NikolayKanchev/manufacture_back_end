const express = require('express');
const router = express.Router();
const details = require('../controllers/details');

router.get("/", details.getAll);

module.exports = router;