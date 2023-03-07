const { Keywords } = require("../../db/models");
const sequelize = require("sequelize");
class KeywordsRepo {
  addKeyword = async ({ keyword }) => {
    await Keywords.create({
      count: 1,
      keyword,
    });

    return;
  };

  findKeyword = async ({ keyword }) => {
    const data = await Keywords.findOne({ where: { keyword } });

    return data;
  };

  plusKeyword = async ({ keyword }) => {
    await Keywords.increment({ count: +1 }, { where: { keyword } });
  };

  showKeyword = async () => {
    const data = await Keywords.findAll({
      attributes: ["keywordId", "keyword", "count"],

      order: [["count", "DESC"]],
      limit: 10,
    });

    return data;
  };
}

module.exports = KeywordsRepo;
