const express = require('express');
const {getProfile} = require('../controllers/profile.controller');
const updateDataStrava = require('../controllers/strava.controller');
const { authValidation } = require('../uti/middlewares/authValidation');

const router = express.Router();

router.post("/updateDataStrava",updateDataStrava);

router.get("/getProfile",authValidation,getProfile);

module.exports = router;
