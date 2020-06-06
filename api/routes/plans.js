const express = require('express');
const router = express.Router();
const plans = require('../controllers/plans');

router.get("/:type", plans.getPlans);

module.exports = router;