const CartService = require("../services/cart.service");

class CartController {
  cartService = new CartService();

  addCart = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { goodsId } = req.params;
    const { option, price, count } = req.body;

    try {
      await this.cartService.addCart(userId, goodsId, option, price, count);
      res.status(201).json({ message: "장바구니에 물건을 추가하였습니다." });
    } catch (error) {
      next(error);
    }
  };

  getCart = async (req, res, next) => {
    const { userId } = res.locals.user;
    try {
      const cartData = await this.cartService.getCart(userId);
      res.status(200).json({ data: cartData });
    } catch (error) {
      next(error);
    }
  };

  editCart = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { cartId } = req.params;
    const { count } = req.body;
    try {
      await this.cartService.editCart(userId, cartId, count);
      res.status(200).json({ message: "장바구니 수정을 완료했습니다" });
    } catch (error) {
      next(error);
    }
  };

  deleteCart = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { cartId } = req.params;
    try {
      await this.cartService.deleteCart(userId, cartId);
      res.status(200), json({ message: "장바구니를 삭제했습니다." });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CartController;
