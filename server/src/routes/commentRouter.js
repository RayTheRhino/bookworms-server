const express = require('express');
const Comment = require('../modules/commentModel');
const router = express.Router();

// Get all comments
router.get('/', async (req, res) =>{
    try{
        const listOfComments = await Comment.find();
        res.json(listOfComments);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

// Get Comment by Id
router.get('/byId/:id', async(res, req) =>{
    try{
        const id = req.params.id;
        const comment = await Comment.findById(id);
        if(!comment){
            return res.status(404).json({error:error.message});
        }
        res.json(comment)
    }catch(error){
        res.status(500).json({error: error.message});
    }
})
// Post new Comment:
router.post("/",async (req,res)=>{
    try{
        const commentData =req.body;
        const newComment = new Comment(commentData);
        await newComment.save();
        res.json(newComment);
    }catch(error){
        res.status(400).json({error:error.message});
    }
});

// Remove Comment by id:
router.delete('/delete/:id', async(req,res) =>{
    try{
        const id = req.params.id;
        const deletedComment =- await User.findByIdAndRemove(id);
        if(!deletedComment){
            return res.status(404).json({error: "User not found"});
        }
        res.json({message:"User deleted succesfully"});
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

// Remove all comments:
router.delete('/delete-all', async(req,res)=>{
    try{
        const result = await Comment.deleteMany({});
        res.json({message:`${result.deletedCount}`});
    }catch(error){
        res.status(500).json({error:error.message});
    }
});
