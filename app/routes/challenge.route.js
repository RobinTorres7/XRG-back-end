const express = require('express');
const router = express.Router();
const readChallengeCards = require('../controllers/challenge.controller');

router.get("/readChallengeCards",readChallengeCards);


module.exports = router;
