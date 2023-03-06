const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const GoodsController = require("../controllers/goods.controller");
const goodsController = new GoodsController();

router.post("/", upload, goodsController.createGoods);
router.get("/", goodsController.getAllGoods);
router.get("/:goodsId", goodsController.getGoods);
router.patch("/:goodsId", goodsController.editGoods);
router.delete("/:goodsId", goodsController.deleteGoods);

module.exports = router;
