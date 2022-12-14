const express = require('express');
const router = express.Router();
const readRoutes = require('../controllers/route.controller');

router.get("/readRoutes",readRoutes);


module.exports = router;