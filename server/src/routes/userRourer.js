const express = require('express');
const User = require('../modules/userModel');
const router = express.Router();

// Get all users
router.get("/", async(req,res)=>{
    try{
        const listOfUsers = await User.find();
        res.json(listOfUsers);
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

// Get user by ID
router.get('/byId/:id', async(res,req)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({error:"user not found"});
        }
        res.json(user);
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

// Post new user
router.post("/register",async (req,res)=>{
    try{
        const userData =req.body;
        const newUser = new User(userData);
        await newUser.save();
        res.json(newUser);
    }catch(error){
        res.status(400).json({error:error.message});
    }
});

// Remove user by id:
router.delete('/delete/:id', async(req,res) =>{
    try{
        const id = req.params.id;
        const deletedUSer =- await User.findByIdAndRemove(id);
        if(!deletedUser){
            return res.status(404).json({error: "User not found"});
        }
        res.json({message:"User deleted succesfully"});
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

// Update user email by Id:
router.put('/update/email/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { email }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user password by Id:
router.put('/update/password/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { password }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;