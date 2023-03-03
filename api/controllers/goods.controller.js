const GoodsService = require("../services/goods.service");

class GoodsController {
  goodsService = new GoodsService();

  createGoods = async (req, res, next) => {
    const { name, content, price, category, option } = req.body;

    await this.goodsService.createGoods(name, content, price, category, option);
    res.status(201).json({ message: "게시글이 생성되었습니다." });
  };

  getAllGoods = async (req, res, next) => {
    const goodsData = await this.goodsService.getAllGoods()
    res.status(200).json({data:goodsData})
  }

  getGoods = async (req, res, next) => {
    const {goodsId} = req.params
    const goodsData = await this.goodsService.getGoods(goodsId)
    res.status(200).json({data:goodsData})
  }

  editGoods = async (req, res, next) => {
    // const {userId} = res.locals.user
    const {goodsId} = req.params
    const {name,content} = req.body
    
    await this.goodsService.editGoods(goodsId, name,content)
    res.status(200).json({message : "게시글 수정이 완료되었습니다."})
  }

  deleteGoods = async(req,res,next) => {
    const {goodsId} = req.params

    await this.goodsService.deleteGoods(goodsId)
    res.status(200).json({message : "게시글을 삭제했습니다."})
  }
}

module.exports = GoodsController;
