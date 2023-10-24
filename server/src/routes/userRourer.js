const express = require('express');
const router = express.Router();
const {
    createNewUser,
    getAllUsers,
    getUserByEmail,
    deleteUserById,
    updateUserEmail,
    updateUserPassword
} = require('../controllers/userController');

// Get all users
router.get("/", getAllUsers);

// Get user by Email
router.get('/byId/:id', getUserByEmail);

// Post new user
router.post("/register",createNewUser);

// Remove user by id:
router.delete('/delete/:id', deleteUserById);

// Update user email by Id:
router.put('/update/email/:id', updateUserEmail);

// Update user password by Id:
router.put('/update/password/:id', updateUserPassword);


module.exports = router;