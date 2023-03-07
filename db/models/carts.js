"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        sourceKey: "userId",
        foreignKey: "userId",
      });
      this.belongsTo(models.Goods, {
        sourceKey: "goodsId",
        foreignKey: "goodsId",
      });
      // define association here
    }
  }
  Carts.init(
    {
      cartid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      goodsId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      totalprice: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      option: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      count: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Carts",
    }
  );
  return Carts;
};
