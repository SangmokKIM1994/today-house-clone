"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Goods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        targetKey: "userId",
        foreignKey: "userId",
      });

      this.hasMany(models.Comments, {
        sourceKey: "goodsId",
        foreignKey: "goodsId",
      });

      this.hasMany(models.Likes, {
        sourceKey: "goodsId",
        foreignKey: "goodsId",
      });
      this.hasMany(models.Carts, {
        sourceKey: "goodsId",
        foreignKey: "goodsId",
      });
    }
  }
  Goods.init(
    {
      goodsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      src: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      freeDilivery: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      specialPrice: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      option: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      review: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      star: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      percentSale: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Goods",
    }
  );
  return Goods;
};
