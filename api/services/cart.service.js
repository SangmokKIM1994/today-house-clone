const CartRepository = require("../repositories/cart.repository");
const { makeError } = require("../error");

class CartService {
  cartRepository = new CartRepository();

  addCart = async (userId, goodsId, option, price, count) => {
    const goodsData = await this.cartRepository.getGoods(goodsId);
    if (!goodsData) {
      throw new makeError({
        message: "장바구니에 추가할 상품이 없습니다.",
        code: 404,
      });
    }
    const totalprice = price * count;
    const name = goodsData.name;
    await this.goodsRepository.addCart(
      userId,
      goodsId,
      name,
      totalprice,
      option,
      count
    );
    return;
  };

  getCart = async (userId) => {
    const userData = await this.cartRepository.findUser(userId);
    if (!userData) {
      throw new makeError({
        message: "해당하는 사용자가 존재하지 않습니다.",
        code: 404,
      });
    }
    const cartData = await this.cartRepository.getCart(userId);
    return cartData;
  };

  editCart = async (userId, cartId, count) => {
    const cartData = await this.cartRepository.findCart(cartId);
    if (cartData.userId !== userId) {
      throw new makeError({
        message: "잘못된 접근입니다.",
        code: 400,
      });
    }
    await this.cartRepository.editCart(cartId, count);
    return;
  };

  deleteCart = async (userId, cartId) => {
    const cartData = await this.cartRepository.findCart(cartId);
    if (cartData.userId !== userId) {
      throw new makeError({
        message: "잘못된 접근입니다.",
        code: 400,
      });
    }
    await this.cartRepository.deleteCart(cartId);
    return;
  };
}

module.exports = CartService;
