const express = require('express');
const updateDataStrava = require('../controllers/strava.controller');
const  {authValidation}  = require('../uti/middlewares/authValidation');

const router = express.Router();

router.post("/updateDataStrava",authValidation,updateDataStrava);



module.exports = router;
