const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recipediets', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'recipes',
        key: 'id'
      }
    },
    dietId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'diets',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'recipediets',
    timestamps: true,
    indexes: [
      {
        name: "recipeId.fk.2_idx",
        using: "BTREE",
        fields: [
          { name: "recipeId" },
        ]
      },
      {
        name: "dietId2.fk_idx",
        using: "BTREE",
        fields: [
          { name: "dietId" },
        ]
      },
    ]
  });
};
