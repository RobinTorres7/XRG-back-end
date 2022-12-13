const express = require('express');
const router = express.Router();
const readAdCards = require('../controllers/ad.controller');

router.get("/readAdCards",readAdCards);


module.exports = router;
