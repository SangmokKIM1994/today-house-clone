const { Users } = require("../../db/models/");
class UsersRepository {
  constructor() {}

  signupRepo = async ({ email, password, nickname }) => {
    const signupUser = await Users.create({
      email,
      password,
      nickName: nickname,
    });

    return signupUser;
  };

  loginRepo = async ({ email }) => {
    const loginUser = await Users.findOne({
      where: { email },
    });

    return loginUser;
  };

  nickNameRepo = async ({ nickname }) => {
    const nickNameUser = await Users.findOne({
      where: { nickName: nickname },
    });

    return nickNameUser;
  };

  userFindById = async ({ userId }) => {
    const user = await Users.findOne({
      attributes: ["nickName"],
      where: { userId },
    });
    return user;
  };
}

module.exports = UsersRepository;
