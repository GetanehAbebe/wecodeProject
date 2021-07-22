const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('likes', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'recipes',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'likes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
          { name: "recipeId" },
        ]
      },
      {
        name: "recipeId.fk.1_idx",
        using: "BTREE",
        fields: [
          { name: "recipeId" },
        ]
      },
      {
        name: "userId.fk.1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
};
