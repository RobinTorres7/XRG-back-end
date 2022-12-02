const express = require('express');
const updatePhotoProfile = require('../controllers/profile.controller');
const router = express.Router();
const multer = require ('multer');
const { authValidation } = require('../uti/middlewares/authValidation');

const upload = multer();

router.post("/updatePhotoProfile",authValidation, upload.single('photo'),updatePhotoProfile);

module.exports = router;