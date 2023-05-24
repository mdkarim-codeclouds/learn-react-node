const db = require("../models");
const moment = require('moment');
const BlogPost = db.blog_post;

exports.insert = (req, res) => {
    const blog_post = new BlogPost({
        title: req.body.title,
        details: req.body.details,
        image: req.body.image,
        contents: req.body.contents,
        status: req.body.status,
        publish_on: req.body.publish_on,
        user: req.userId,
        created_on: moment().format(),
        updated_on: moment().format(), 
        isDeleted: false
    });

    blog_post.save((err, blog_post) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Blog post is created successfully!" });
        return;
    });
};

exports.update = (req, res) => {
    BlogPost.findByIdAndUpdate(req.body._id, {
        title: req.body.title,
        details: req.body.details,
        image: req.body.image,
        contents: req.body.contents,
        status: req.body.status,
        publish_on: req.body.publish_on,
        user: req.userId,
        updated_on: moment().format(), 
        isDeleted: false
    })
    .exec((err, blog_post) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!blog_post) {
            return res.status(404).send({ message: "Blog post not found." });
        }

        res.status(200).send({ message: "Blog post updated successfully" });
    });
};

exports.delete = (req, res) => {
    BlogPost.findByIdAndUpdate(req.body._id, {
        updated_on: moment().format(), 
        isDeleted: true,
    })
    .exec((err, blog_post) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!blog_post) {
            return res.status(404).send({ message: "Blog post not found." });
        }

        res.status(200).send({ message: "Blog post deleted successfully" });
    });
};

exports.fetch = (req, res) => {
    BlogPost.find({
        isDeleted: false,
    })
    .exec((err, blog_posts) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!blog_posts) {
            return res.status(404).send({ message: "Blog post not found." });
        }

        res.status(200).send({ data: blog_posts, message: "Blog post fetched successfully" });
    });
};

exports.fetchPost = (req, res) => {
    BlogPost.findOne({
        _id: req.query._id,
        isDeleted: false,
    })
    .exec((err, blog_post) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!blog_post) {
            return res.status(404).send({ message: "Blog post not found." });
        }

        res.status(200).send({ data: blog_post, message: "Blog post fetched successfully" });
    });
};