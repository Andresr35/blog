var express = require("express");
var router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);
router.post("/", postController.postCreatePost);

router.get("/:id", postController.getOnePost);
router.delete("/:id", postController.deletePost);

router.post("/:id/comment", postController.createComment);

router.delete("/:id/comment/:commentID", postController.deleteComment);

module.exports = router;
