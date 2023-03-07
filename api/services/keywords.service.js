const KeywordsRepo = require("../repositories/keywords.repository");

class KeywordsService {
  keywordsRepo = new KeywordsRepo();

  addKeyword = async ({ keyword }) => {
    const data = await this.keywordsRepo.findKeyword({ keyword });
    if (!data) {
      await this.keywordsRepo.addKeyword({ keyword });
    }
    if (data) {
      await this.keywordsRepo.plusKeyword({ keyword });
    }

    return;
  };

  showKeyword = async () => {
    const data = await this.keywordsRepo.showKeyword();

    return data;
  };
}

module.exports = KeywordsService;
