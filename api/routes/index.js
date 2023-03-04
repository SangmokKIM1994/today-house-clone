const express = require("express");

const GoodsRouter = require("./goods.route");
const UsersRouter = require("./users.routes");
const router = express.Router();

router.use("/posts", GoodsRouter);

router.get("/", (_req, res) => {
  res.send("정상적으로 요청되었습니다.");
});

router.use("/", [UsersRouter]);

module.exports = router;
