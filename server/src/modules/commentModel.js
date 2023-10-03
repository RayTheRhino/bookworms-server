const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    title:{type:String, required:true},
    commentBody: {type:String, required:true},
    username: {type: String, required: true}
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment; 