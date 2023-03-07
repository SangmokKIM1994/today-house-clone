const jwt = require("jsonwebtoken");
const { Users } = require("../../db/models");
require("dotenv").config();
const { KEY } = process.env;
module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, token] = (authorization ?? "").split(" ");

  if (token) {
    const { userId } = jwt.verify(token, KEY);
    const user = await Users.findOne({ where: { email: userId } });

    res.locals.user = user;
  }
  next();
};
