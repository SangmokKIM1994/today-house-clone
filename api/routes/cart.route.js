const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");
const cartController = new CartController();

router.post("/:goodsId/cart", cartController.addCart);
router.get("/cart", cartController.getCart);
router.patch("/cart/:cartId", cartController.editCart);
router.delete("/cart/:cartId", cartController.deleteCart);

module.exports = router;
