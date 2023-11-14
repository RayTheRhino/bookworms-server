const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    title:{type:String, required:true},
    content: {type:String, required:true},
    createdAt : {type: Data, default:Date.now},
    username: {type: String, required: true},
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic; 