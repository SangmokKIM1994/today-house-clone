const express = require("express");
const router = express.Router();

const Userscontroller = require("../controllers/user.controller");
const usersController = new Userscontroller();

router.post("/signup", usersController.signupController);
router.post("/login", usersController.loginController);

module.exports = router;
