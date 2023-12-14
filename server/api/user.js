var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res, next) => {
  res.send("Welcome to api/user");
});

router.post("/login", userController.postLogIn);

router.get("/protected", userController.getTest);
module.exports = router;
