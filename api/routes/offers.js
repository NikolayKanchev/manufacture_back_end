const express = require('express');
const router = express.Router();
const offers = require('../controllers/offers');

router.post("/send-offer", offers.sendOffer);

module.exports = router;