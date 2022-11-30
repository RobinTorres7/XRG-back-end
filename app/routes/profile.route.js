const express = require('express');
const updatePhotoProfile = require('../controllers/profile.controller');
const router = express.Router();
const multer = require ('multer');

const upload = multer();

router.put("/updatePhotoProfile",upload.any(),updatePhotoProfile);

module.exports = router;