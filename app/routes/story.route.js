const express = require('express');
const router = express.Router();
const readStories = require('../controllers/story.controller');

router.get("/readStories",readStories);


module.exports = router;