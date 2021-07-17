const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('recipeingredients', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    unitId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'recipeingredients',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "recipeId" },
          { name: "ingredientId" },
        ]
      },
    ]
  });
};
