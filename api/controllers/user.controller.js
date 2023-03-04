const UsersService = require("../services/user.service");
const jwt = require("jsonwebtoken");
const { Users } = require("../../db/models");
require("dotenv").config();
const { KEY } = process.env;

class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }
  //회원가입
  signupController = async (req, res, next) => {
    const { email, password, confirm, nickname } = req.body;

    if (!email || !password || !confirm || !nickname) {
      return res.json({ message: "빈 칸을 확인해주세요." });
    } else if (password !== confirm) {
      return res.json({ message: "입력하신 비밀번호가 일치하지 않습니다." });
    }

    try {
      await this.usersService.signupService({ email, password, nickname });

      res.status(200).json({ message: "회원가입에 성공하였습니다." });
    } catch (error) {
      console.log(error);
      next();
    }
  };
  //로그인
  loginController = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await this.usersService.loginService({ email, password });

    let expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);

    const token = jwt.sign({ userId: user.id }, KEY, { expiresIn: "1h" });

    res.cookie("authorization", `Bearer ${token}`, {
      expires: expires,
    });
    res.status(200).json({
      message: "로그인에 성공하셨습니다.",
      Authorization: `Bearer ${token}`,
    });
  };
}

module.exports = UsersController;
