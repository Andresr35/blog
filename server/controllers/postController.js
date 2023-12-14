const Post = require("../models/posts");
const asyncHander = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { authenticateToken } = require("../jwt");

exports.postCreatePost = [
  authenticateToken,
  asyncHander(async (req, res, next) => {
    let { message, title } = req.body;
    console.log(req.body);
    if (!message) {
      return res.status(400).json({
        message: "Missing Message",
      });
    } else if (!req.body.title) {
      return res.status(400).json({
        message: "Missing Title",
      });
    }
    const post = new Post({
      message: req.body.message,
      title: req.body.title,
    });
    await post.save();
    return res.status(201).json({
      message: "Post Created!",
      post,
    });
  }),
];

exports.getAllPosts = asyncHander(async (req, res, next) => {
  const allPosts = await Post.find({}).exec();
  res.status(200).json({
    posts: allPosts,
  });
});

// exports.postDeletePost = asyncHander(async (req, res, next) => {
//   await Post.findByIdAndDelete(req.body.postID);
//   res.redirect("/");
// });
