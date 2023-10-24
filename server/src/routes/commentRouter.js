const express = require('express');
const router = express.Router();
const{
    getAllComments,
    getComment,
    createComment,
    removeComment,
    removeAllComments
} = require('../controllers/commentController')

// Get all comments
router.get('/', getAllComments);

// Get Comment by Id
router.get('/byId/:id', getComment);

// Post new Comment:
router.post("/", createComment);

// Remove Comment by id:
router.delete('/delete/:id', removeComment);

// Remove all comments:
router.delete('/delete-all', removeAllComments);

module.exports = router;
