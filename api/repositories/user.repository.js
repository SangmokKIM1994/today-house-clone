const { Users } = require("../../db/models/");
const { Op } = require("sequelize");
class UsersRepository {
  constructor() {}

  signupRepo = async ({ email, password, nickname }) => {
    await Users.findOne({});
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
}

module.exports = UsersRepository;
