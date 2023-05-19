const mongoose = require("mongoose");

const BlogPost = mongoose.model(
    "BlogPost",
    new mongoose.Schema({
        title: String,
        details: String,
        image: String,
        contents: String,
        status: String,
        publish_on: String,
        user: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        created_on: String,
        updated_on: String, 
        isDeleted: { type: Boolean, defaults: false }
    })
);

module.exports = BlogPost;