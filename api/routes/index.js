const express = require("express");
const { route } = require('./users.routes');
const router = express.Router();

router.get("/", (_req, res) => {
  res.send("정상적으로 요청되었습니다.");
});

const UsersRouter = require('./users.routes')

router.use("/", [UsersRouter]);

module.exports = router;
