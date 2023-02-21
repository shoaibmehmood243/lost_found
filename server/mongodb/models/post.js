const mongoose = require("mongoose");

const Post = new mongoose.Schema({
    name: {type: String, required: true},
    rollNumber: {type: String, required: true},
    description: {type: String, required: false},
});

const PostSchema = mongoose.model("Post", Post);

module.exports = PostSchema;