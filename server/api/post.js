var express = require("express");
var router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);
router.post("/", postController.postCreatePost);

module.exports = router;
