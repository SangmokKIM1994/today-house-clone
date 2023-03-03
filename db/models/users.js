'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Goods, {
        sourceKey: "userId",
        foreignKey: "userId",
      });

      this.hasMany(models.Comments, {
        sourceKey: "userId",
        foreignKey: "userId",
      });
      this.hasMany(models.Likes, {
        sourceKey: "userId",
        foreignKey: "userId",
      });
    }
  }
  Users.init({
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    nickName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cart: {
      type: DataTypes.STRING,
      allowNull: true,
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
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};