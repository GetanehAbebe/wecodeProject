const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recipeingredients', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'recipes',
        key: 'id'
      }
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ingredients',
        key: 'id'
      }
    },
    unitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'measuringunits',
        key: 'id'
      }
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
      {
        name: "ingredient_fk_idx",
        using: "BTREE",
        fields: [
          { name: "ingredientId" },
        ]
      },
      {
        name: "recipeid_fk_idx",
        using: "BTREE",
        fields: [
          { name: "recipeId" },
        ]
      },
      {
        name: "unit_id_idx_idx",
        using: "BTREE",
        fields: [
          { name: "unitId" },
        ]
      },
    ]
  });
};
