const express = require("express");
const router = express.Router();
const JoiHelper = require("../helpers/joy.helper");
const Userscontroller = require("../controllers/user.controller");
const usersController = new Userscontroller();

router.post("/signup", JoiHelper.signUpCheck, usersController.signupController);
router.post("/login", JoiHelper.loginCheck, usersController.loginController);

module.exports = router;
