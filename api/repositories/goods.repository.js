const { Users, Comments, Goods, Likes, sequelize } = require("../../db/models");

class PostsRepository {
  createGoods = async (name, content, price, category, option) => {
    const userId = 1
    const createGoodsData = await Goods.create({ userId,name, content, price, category, option });

    return createGoodsData;
  };

  getAllGoods = async() => {
    const goodsData = await Goods.findAll({
        attributes:[
            "goodsId",
            "name",
            "likesCount",
            "commentsCount"
        ],
        order: [["likesCount", "DESC"]],
        raw:true
    })

    return goodsData
  }

  getGoods = async(goodsId) => {
    const goodsData = await Goods.findOne({
        where : {goodsId},
        attributes:[
            "goodsId",
            "userId",
            "name",
            "content",
            "price",
            "option",
            "likesCount",
            "commentsCount",
            "createdAt",
            "updatedAt"
        ],
        include: [{ model: Users, attributes: ["nickName"] }],
        raw:true
    })

    return goodsData
  }

  editGoods = async(goodsId, name,content) => {
    await Goods.update({name,content},{where:{goodsId}})
    return
  }

  deleteGoods = async(goodsId) => {
    await Goods.destroy({where:{goodsId}})
    return
  }
}

module.exports = PostsRepository;
