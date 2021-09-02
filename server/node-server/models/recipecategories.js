const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recipecategories', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'recipes',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'recipecategories',
    timestamps: true,
    indexes: [
      {
        name: "categoryId_fk_idx",
        using: "BTREE",
        fields: [
          { name: "categoryId" },
        ]
      },
      {
        name: "recipeId_fk_idx",
        using: "BTREE",
        fields: [
          { name: "recipeId" },
        ]
      },
    ]
  });
};
