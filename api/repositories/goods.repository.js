const { Users, Comments, Goods, Likes, sequelize } = require("../../db/models");

class GoodsRepository {
  createGoods = async (
    userId,
    name,
    content,
    price,
    category,
    option,
    fileName,
    fileUrl
  ) => {
    const createGoodsData = await Goods.create({
      userId,
      name,
      content,
      price,
      category,
      option,
      fileName,
      fileUrl,
    });

    return createGoodsData;
  };

  getAllGoods = async () => {
    const goodsData = await Goods.findAll({
      attributes: ["goodsId", "name", "likesCount", "commentsCount"],
      order: [["likesCount", "DESC"]],
      raw: true,
    });

    return goodsData;
  };

  getGoods = async (goodsId) => {
    const goodsData = await Goods.findOne({
      where: { goodsId },
      attributes: [
        "goodsId",
        "userId",
        "name",
        "content",
        "price",
        "option",
        "category",
        "likesCount",
        "commentsCount",
        "createdAt",
        "updatedAt",
      ],
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
