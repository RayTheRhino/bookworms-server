const User = require('../modules/userModel');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) =>{
    return jwt.sign({id}, 'bookworm secret', {
        expiresIn: maxAge,
    });
}


// Get all users
const getAllUsers = async(req,res) =>{
    try{
        const listOfUsers = await User.find();
        res.json(listOfUsers);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

// Get user by email
const getUserByEmail= async(req,res) =>{
    try{
        console.log("Request user by email: " + req.params.id)
        const email = req.params.id;
        const user = await User.findOne({email : email});
        if(!user){
            return res.status(404).json({error:"user not found"});
        }
        res.json(user);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

// Create new user
const createNewUser = async(req,res) =>{
    try{
        const userData =req.body;
        const newUser =await User.create(userData);
        const token = createToken(newUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        // const savedUser = await newUser.save();
        res.status(201).json({newUser: newUser._id});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

// Remove user by id
const deleteUserById = async(req,res) =>{
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
}

// update user email by id
const updateUserEmail = async(req,res)=>{
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
}

// update user password by id
const updateUserPassword = async(req,res)=>{
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
}

module.exports = {
    createNewUser,
    getAllUsers,
    getUserByEmail,
    deleteUserById,
    updateUserEmail,
    updateUserPassword
}