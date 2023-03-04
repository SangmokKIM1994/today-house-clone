const GoodsService = require("../services/goods.service");

class GoodsController {
  goodsService = new GoodsService();

  createGoods = async (req, res, next) => {
    console.log(req.body);
    const { name, content, price, category, option } = req.body;

    try {
      if (req.file) {
        const filiName = req.file.key;
        const fileUrl = req.file.location;
        await this.goodsService.createGoods(
          name,
          content,
          price,
          category,
          option,
          filiName,
          fileUrl
        );
      } else {
        await this.goodsService.createGoods(
          name,
          content,
          price,
          category,
          option
        );
      }

      res.status(201).json({ message: "게시글이 생성되었습니다." });
    } catch (error) {
      next(error);
    }
  };

  getAllGoods = async (req, res, next) => {
    try {
      const goodsData = await this.goodsService.getAllGoods();
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
    // const {userId} = res.locals.user
    const { goodsId } = req.params;
    const { name, content } = req.body;
    try {
      await this.goodsService.editGoods(goodsId, name, content);
      res.status(200).json({ message: "게시글 수정이 완료되었습니다." });
    } catch (error) {
      next(error);
    }
  };

  deleteGoods = async (req, res, next) => {
    const { goodsId } = req.params;
    try {
      await this.goodsService.deleteGoods(goodsId);
      res.status(200).json({ message: "게시글을 삭제했습니다." });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = GoodsController;
