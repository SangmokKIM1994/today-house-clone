const GoodsRepository = require("../repositories/goods.repository");
const { makeError } = require("../error");

class GoodsService {
  goodsRepository = new GoodsRepository();

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
    const createGoodsData = await this.goodsRepository.createGoods(
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
    if (!createGoodsData) {
      throw new makeError({
        message: "게시글 생성에 실패했습니다.",
        code: 400,
      });
    }
    return createGoodsData;
  };

  getAllGoods = async (group, click) => {
    const goodsData = await this.goodsRepository.getAllGoods(group, click);
    if (!goodsData) {
      throw new makeError({
        message: "게시글 조회를 실패했습니다.",
        code: 404,
      });
    }
    return goodsData;
  };

  getGoods = async (userId, goodsId) => {
    const goodsData = await this.goodsRepository.getGoods(userId, goodsId);
    // const likeStatus = await this.goodsRepository
    if (!goodsData) {
      throw new makeError({
        message: "게시글 조회를 실패했습니다.",
        code: 404,
      });
    }
    return goodsData;
  };

  editGoods = async (
    userId,
    goodsId,
    name,
    content,
    price,
    category,
    option
  ) => {
    const goodsData = await this.goodsRepository.getGoods(goodsId);
    if (!goodsData) {
      throw new makeError({
        message: "수정할 게시글을 찾지 못했습니다.",
        code: 404,
      });
    }
    if (goodsData.userId !== userId) {
      throw new makeError({
        message: "게시글 수정 권한이 없습니다.",
        code: 401,
      });
    }
    await this.goodsRepository.editGoods(
      goodsId,
      name,
      content,
      price,
      category,
      option
    );
    return;
  };

  deleteGoods = async (userId, goodsId) => {
    const goodsData = await this.goodsRepository.getGoods(goodsId);
    if (!goodsData) {
      throw new makeError({
        message: "삭제할 게시글을 찾지 못했습니다.",
        code: 404,
      });
    }
    if (goodsData.userId !== userId) {
      throw new makeError({
        message: "이 게시물을 삭제할 권한이 없습니다.",
        code: 401,
      });
    }
    await this.goodsRepository.deleteGoods(goodsId);
    return;
  };
}

module.exports = GoodsService;
