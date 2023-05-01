const { Users, Comments, Goods, Likes, sequelize } = require("../../db/models");
const { Op } = require("sequelize");

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

  getAllGoods = async (group, click) => {
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
      limit: Number(group),
      offset: (click - 1) * Number(group),
      raw: true,
    });

    return goodsData;
  };

  getGoods = async (goodsId) => {
    const goodsData = await Goods.findOne({
      where: { goodsId },
      include: [{ model: Users, attributes: ["nickName"] }],
      raw: true,
    });
    return goodsData;
  };

  editGoods = async (
    goodsId,
    title,
    content,
    price,
    option,
    freeDilivery,
    specialPrice,
    percentSale
  ) => {
    await Goods.update(
      {
        title,
        content,
        price,
        option,
        freeDilivery,
        specialPrice,
        percentSale,
      },
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
