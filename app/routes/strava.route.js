const express = require('express');
const updateDataStrava = require('../controllers/strava.controller');

const router = express.Router();

router.post("/updateDataStrava",updateDataStrava);



module.exports = router;
