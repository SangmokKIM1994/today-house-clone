const GoodsRepository = require("../repositories/goods.repository");
const { makeError } = require("../error");

class GoodsService {
  goodsRepository = new GoodsRepository();

  createGoods = async (name, content, price, category, option, ...file) => {
    const createGoodsData = await this.goodsRepository.createGoods(
      name,
      content,
      price,
      category,
      option,
      ...file
    );
    if (!createGoodsData) {
      throw new makeError({
        message: "게시글 생성에 실패했습니다.",
        code: 400,
      });
    }
    return createGoodsData;
  };

  getAllGoods = async () => {
    const goodsData = await this.goodsRepository.getAllGoods();
    if (!goodsData) {
      throw new makeError({
        message: "게시글 조회를 실패했습니다.",
        code: 404,
      });
    }
    return goodsData;
  };

  getGoods = async (goodsId) => {
    const goodsData = await this.goodsRepository.getGoods(goodsId);
    if (!goodsData) {
      throw new makeError({
        message: "게시글 조회를 실패했습니다.",
        code: 404,
      });
    }
    return goodsData;
  };

  editGoods = async (goodsId, name, content) => {
    const goodsData = await this.goodsRepository.getGoods(goodsId);
    if (!goodsData) {
      throw new makeError({
        message: "수정할 게시글을 찾지 못했습니다.",
        code: 404,
      });
    }
    await this.goodsRepository.editGoods(goodsId, name, content);
    return;
  };

  deleteGoods = async (goodsId) => {
    const goodsData = await this.goodsRepository.getGoods(goodsId);
    if (!goodsData) {
      throw new makeError({
        message: "삭제할 게시글을 찾지 못했습니다.",
        code: 404,
      });
    }
    await this.goodsRepository.deleteGoods(goodsId);
    return;
  };
}

module.exports = GoodsService;
