const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('recipecategories', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "recipeId" },
          { name: "categoryId" },
        ]
      },
      {
        name: "categoryId_fk_idx",
        using: "BTREE",
        fields: [
          { name: "categoryId" },
        ]
      },
    ]
  });
};
