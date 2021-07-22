const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('instructions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    instruction: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'recipes',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'instructions',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
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
