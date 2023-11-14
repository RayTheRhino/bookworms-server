const express = require('express');
const router = express.Router();
const {
    getAllTopics,
    createNewTopic,

} = require('../controllers/userController');

// Get all topics
router.get("/all-topics", getAllTopics);

// Get user by Email
router.post('/create-new-topic', createNewTopic);




module.exports = router;