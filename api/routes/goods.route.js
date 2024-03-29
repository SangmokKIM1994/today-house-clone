const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const loginMiddleware = require("../middlewares/login.Middleware");
const GoodsController = require("../controllers/goods.controller");
const goodsController = new GoodsController();

router.post("/", loginMiddleware, upload, goodsController.createGoods);
router.get("/", goodsController.getAllGoods);
router.get("/:goodsId", goodsController.getGoods);
router.patch("/:goodsId", loginMiddleware, goodsController.editGoods);
router.delete("/:goodsId", loginMiddleware, goodsController.deleteGoods);

module.exports = router;
