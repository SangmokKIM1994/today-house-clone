const GoodsService = require("../services/goods.service");

class GoodsController {
  goodsService = new GoodsService();

  createGoods = async (req, res, next) => {
    const { userId } = res.locals.user;
    const {
      title,
      content,
      price,
      option,
      freeDilivery,
      specialPrice,
      percentSale,
    } = req.body;
    try {
      let fileUrl = [];
      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          fileUrl.push(req.files[i].location);
        }
      }
      await this.goodsService.createGoods(
        userId,
        title,
        content,
        price,
        option,
        freeDilivery,
        specialPrice,
        percentSale,
        fileUrl
      );
      res.status(201).json({ message: "게시글이 생성되었습니다." });
    } catch (error) {
      next(error);
    }
  };

  getAllGoods = async (req, res, next) => {
    const { group, click } = req.query;
    try {
      const goodsData = await this.goodsService.getAllGoods(group, click);
      res.status(200).json({ data: goodsData });
    } catch (error) {
      next(error);
    }
  };

  getGoods = async (req, res, next) => {
    const { goodsId } = req.params;
    try {
      const goodsData = await this.goodsService.getGoods(goodsId);
      res.status(200).json({ data: goodsData });
    } catch (error) {
      next(error);
    }
  };

  editGoods = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { goodsId } = req.params;
    const {
      title,
      content,
      price,
      option,
      freeDilivery,
      specialPrice,
      percentSale,
    } = req.body;
    try {
      await this.goodsService.editGoods(
        userId,
        goodsId,
        title,
        content,
        price,
        option,
        freeDilivery,
        specialPrice,
        percentSale
      );
      res.status(200).json({ message: "게시글 수정이 완료되었습니다." });
    } catch (error) {
      next(error);
    }
  };

  deleteGoods = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { goodsId } = req.params;
    try {
      await this.goodsService.deleteGoods(userId, goodsId);
      res.status(200).json({ message: "게시글을 삭제했습니다." });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = GoodsController;
