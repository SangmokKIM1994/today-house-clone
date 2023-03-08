const UsersService = require("../services/user.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY } = process.env;

class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }
  //회원가입
  signupController = async (req, res, next) => {
    const { email, password, nickname } = req.body;
    try {
      await this.usersService.signupService({
        email,
        password,
        nickname,
      });

      res.status(201).json({ message: "회원가입을 성공하였습니다." });
    } catch (error) {
      next(error);
    }
  };

  //로그인
  loginController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await this.usersService.loginService({ email, password });

      let expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);

      const token = jwt.sign({ userId: user.email }, KEY, { expiresIn: "1h" });

      res.cookie("authorization", `Bearer ${token}`, {
        expires: expires,
      });
      res.status(200).json({
        message: "로그인에 성공하셨습니다.",
        token: `${token}`, //왜 body값으로 한번 더 주는가
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersController;
