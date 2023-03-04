const UsersRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const { makeError } = require("../error");

class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  signupService = async ({ email, password, confirm, nickname }) => {
    const emailExistUser = await this.usersRepository.loginRepo({ email });
    const nickNameExistUser = await this.usersRepository.nickNameRepo({
      nickname,
    });

    const re_email =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+).(\.[0-9a-zA-Z_-]+){1,3}$/;
    const re_nickname = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]){2,15}$/;
    const re_password = /^[a-zA-Z0-9]{8,}$/;

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
    if (!re_email.test(email)) {
      throw new makeError({
        message: "email 형식에 맞춰서 입력 바랍니다.",
        code: 400,
      });
    }
    if (!re_nickname.test(nickname)) {
      throw new makeError({
        message: "닉네임은 특수문자 제외 2~15자만 입력이 가능합니다. ",
        code: 400,
      });
    }
    if (!re_password.test(password)) {
      throw new makeError({
        message: "비밀번호는 영문, 숫자를 포함한 8자리 이상 조합입니다.",
        code: 400,
      });
    }
    if (password !== confirm) {
      throw new makeError({
        message: "비밀번호 확인이 일치하지 않습니다.",
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

    const re_email =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+).(\.[0-9a-zA-Z_-]+){1,3}$/;
    const re_password = /^[a-zA-Z0-9]{8,}$/;

    if (!isExistUser) {
      throw new makeError({
        message: "email이 존재하지 않습니다.",
        code: 400,
      });
    }

    if (!re_email.test(email)) {
      throw new makeError({
        message: "email 형식에 맞춰서 입력 바랍니다.",
        code: 400,
      });
    }

    if (!re_password.test(password)) {
      throw new makeError({
        message: "비밀번호는 영문, 숫자를 포함한 8자리 이상 조합입니다.",
        code: 400,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isExistUser.password
    );

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
