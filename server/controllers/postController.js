const Post = require("../models/posts");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { authenticateToken } = require("../jwt");

exports.postCreatePost = [
  authenticateToken,
  asyncHandler(async (req, res, next) => {
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

exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({}).exec();
  res.status(200).json({
    posts: allPosts,
  });
});

exports.getOnePost = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).exec();
    res.status(200).json({
      post,
      message: "Success",
    });
  } catch (error) {
    res.status(400).json({
      message: "Post not found",
      error,
    });
  }
});

exports.deletePost = [
  authenticateToken,
  asyncHandler(async (req, res, next) => {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "Sucess",
      });
    } catch (error) {
      res.status(400).json({
        message: "Post not found",
      });
    }
  }),
];
