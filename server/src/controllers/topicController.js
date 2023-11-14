const Topic = require('../modules/topics');

// Get all topics
const getAllTopics = async(req,res) =>{
    try{
        const listOfTopics = await Topic.find().sort({createdAt:-1});
        res.status(200).json(listOfTopics);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

// Create new topic
const createNewTopic = async(req,res) =>{
    try{
        const {title, content, username} = req.body;
        if(!title || !content || !username){
            return res.status(400).json({error: 'All fields are required'});
        }

        const newTopic = new Topic({title, content, username});
        await newTopic.save();
        return res.status(201).json(newTopic);

    }catch(error){
        res.status(500).json({error:'Error creating new topic'});
    }
};






module.exports = {
    getAllTopics,
    createNewTopic
}