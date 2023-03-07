const KeywordsService = require("../services/keywords.service");

class KeywordsController {
  keywordsService = new KeywordsService();

  //검색어 저장
  addKeyword = async (req, res, next) => {
    const { keyword } = req.body;
    try {
      await this.keywordsService.addKeyword({ keyword });

      res.status(200).json({ message: "저장이 완료 되었습니다." });
    } catch (error) {
      next(error);
    }
  };

  //   검색어 10위 내보내기
  showKeyword = async (req, res, next) => {
    try {
      const data = await this.keywordsService.showKeyword();
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = KeywordsController;
