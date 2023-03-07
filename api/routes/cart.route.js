const express = require("express");
const router = express.Router();
const loginMiddleware = require("../middlewares/login.Middleware");
const CartController = require("../controllers/cart.controller");
const cartController = new CartController();

router.post("/:goodsId/cart", loginMiddleware, cartController.addCart);
router.get("/cart", loginMiddleware, cartController.getCart);
router.patch("/cart/:cartId", loginMiddleware, cartController.editCart);
router.delete("/cart/:cartId", loginMiddleware, cartController.deleteCart);

module.exports = router;
