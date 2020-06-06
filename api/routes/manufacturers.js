const express = require('express');
const router = express.Router();
const manufacturers = require('../controllers/manufacturers');

router.get("/", manufacturers.getAll);

module.exports = router;