const { Users, Comments, Goods, Likes, sequelize } = require("../../db/models");

class GoodsRepository {
  createGoods = async (
    userId,
    title,
    content,
    price,
    option,
    freeDilivery,
    specialPrice,
    percentSale,
    fileUrl
  ) => {
    console.log(typeof fileUrl);
    const createGoodsData = await Goods.create({
      userId,
      title,
      content,
      price,
      option,
      freeDilivery,
      specialPrice,
      percentSale,
      src: fileUrl,
    });

    return createGoodsData;
  };

  getAllGoods = async () => {
    const goodsData = await Goods.findAll({
      attributes: [
        "goodsId",
        "title",
        "content",
        "src",
        "price",
        "review",
        "star",
        "freeDilivery",
        "specialPrice",
        "percentSale",
      ],
      order: [["review", "DESC"]],
      raw: true,
    });

    return goodsData;
  };

  getGoods = async (userId, goodsId) => {
    const goodsData = await Goods.findOne({
      where: { goodsId },
      // attributes: [
      //   "goodsId",
      //   "userId",
      //   "title",
      //   "content",
      //   "price",
      //   "option",
      //   "freeDilivery",
      //   "specialPrice",
      //   "review",
      //   "src",
      //   "createdAt",
      //   "updatedAt",
      // ],
      include: [{ model: Users, attributes: ["nickName"] }],
      raw: true,
    });
    return goodsData;
  };

  editGoods = async (goodsId, name, content, price, category, option) => {
    await Goods.update(
      { name, content, price, category, option },
      { where: { goodsId } }
    );
    return;
  };

  deleteGoods = async (goodsId) => {
    await Goods.destroy({ where: { goodsId } });
    return;
  };
}
module.exports = GoodsRepository;
