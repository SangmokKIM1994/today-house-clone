const UsersRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const { makeError } = require("../error");

class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  signupService = async ({ email, password, nickname }) => {
    const emailExistUser = await this.usersRepository.loginRepo({ email });
    const nickNameExistUser = await this.usersRepository.nickNameRepo({
      nickname,
    });

    if (emailExistUser) {
      throw new makeError({
        message: "중복 된 이메일이 존재합니다.",
        code: 400,
      });
    }
    if (nickNameExistUser) {
      throw new makeError({
        message: "중복 된 닉네임이 존재합니다.",
        code: 400,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);

    const signupUser = await this.usersRepository.signupRepo({
      email,
      password: hashedPw,
      nickname,
    });

    return signupUser;
  };

  loginService = async ({ email, password }) => {
    const isExistUser = await this.usersRepository.loginRepo({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isExistUser.password
    );
    if (!isExistUser) {
      throw new makeError({
        message: "email이 존재하지 않습니다.",
        code: 400,
      });
    }
    if (!isPasswordCorrect) {
      throw new makeError({
        message: "비밀번호가 일치하지 않습니다.",
        code: 400,
      });
    }

    return isExistUser;
  };
}

module.exports = UsersService;
