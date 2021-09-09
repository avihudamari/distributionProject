const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title: { type: String, required: true, minlength: 3 },
        body: { type: String, required: true},
        author: {type: String,required: true},
        date: { type: Date, required: true }
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;