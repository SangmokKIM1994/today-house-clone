const UsersRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const { makeError } = require("../error");

class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  signupService = async ({ email, password, nickname }) => {
    const salt = await bcrypt.genSalt(10); // 기본이 10번이고 숫자가 올라갈수록 연산 시간과 보안이 높아진다.
    const hashedPw = await bcrypt.hash(password, salt); // hashed를 데이터베이스에 저장한다.

    const signupUser = await this.usersRepository.signupRepo({
      email,
      password: hashedPw,
      nickname,
    });

    return signupUser;
  };

  loginService = async ({ email, password }) => {
    const isExistUser = await this.usersRepository.loginRepo({ email });
    const validPassword = await bcrypt.compare(password, isExistUser.password);
    if (!isExistUser) {
      throw new makeError({
        message: "이메일을 다시 확인해주세요.",
        code: 400,
      });
    } else if (!validPassword) {
      throw new makeError({
        message: "비밀번호가 일치하지 않습니다.",
        code: 400,
      });
    }

    return isExistUser;
  };
}

module.exports = UsersService;
