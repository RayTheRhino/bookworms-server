const Comment = require('../modules/commentModel');

// Get all comments 
const getAllComments = async (req,res) =>{
    try{
        const listOfComments = await Comment.find();
        res.json(listOfComments);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

// Get comment by id
const getComment = async(req,res)=>{
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
};

// Create new commnet
const createComment = async (req,res)=>{
    try{
        const commentData =req.body;
        const newComment = new Comment(commentData);
        await newComment.save();
        res.json(newComment);
    }catch(error){
        res.status(400).json({error:error.message});
    }
};

// Remove comment by id
const removeComment = async (req,res)=>{
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
};

// Remove all comments
const removeAllComments = async(req,res)=>{
    try{
        const result = await Comment.deleteMany({});
        res.json({message:`${result.deletedCount}`});
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

module.exports = {
    getAllComments,
    getComment,
    createComment,
    removeComment,
    removeAllComments
}