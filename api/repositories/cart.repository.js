const { Goods, Carts, Users } = require("../../db/models");

class CartRepository {
  addCart = async (userId, goodsId, name, totalprice, option, count) => {
    await Carts.create(userId, goodsId, name, totalprice, option, count);
    return;
  };

  findUser = async (userId) => {
    await Users.findOne({ where: { userId } });
    return;
  };

  getCart = async (userId) => {
    const cartData = await Carts.findAll({ where: { userId } });
    return cartData;
  };

  findCart = async (cartId) => {
    return await Carts.findOne({ where: { cartId } });
  };

  editCart = async (cartId, count) => {
    await Carts.update({ count }, { where: cartId });
    return;
  };

  deleteCart = async (cartId) => {
    await Carts.destroy({ where: { cartId } });
    return;
  };
}

module.exports = CartRepository;
