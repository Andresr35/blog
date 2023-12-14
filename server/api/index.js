var express = require("express");
var router = express.Router();

const userRouter = require("./user");
const postRouter = require("./post");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Welcome to the API!");
});

router.use("/user", userRouter);
router.use("/post", postRouter);

module.exports = router;
