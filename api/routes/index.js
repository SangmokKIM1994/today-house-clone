const express = require("express");

const GoodsRouter = require("./goods.route");

const router = express.Router();

router.use("/posts", GoodsRouter);

router.get("/", (_req, res) => {
  res.send("정상적으로 요청되었습니다.");
});

const UsersRouter = require("./users.routes");

router.use("/", [UsersRouter]);

module.exports = router;
