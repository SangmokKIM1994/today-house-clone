const express = require("express");

const UsersRouter = require("./users.routes");
const GoodsRouter = require("./goods.route");
const CommentsRouter = require("./comments.route");
const CartRouter = require("./cart.route");
const KeywordsRouter = require("./keywords.route");

const router = express.Router();

router.use("/", [UsersRouter]);
router.use("/goods", [CartRouter, GoodsRouter]);
router.use("/", CommentsRouter);
router.use("/keyword", KeywordsRouter);

router.get("/", (_req, res) => {
  res.send("정상적으로 요청되었습니다.");
});

module.exports = router;
