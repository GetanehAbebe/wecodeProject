const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
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
    },
    userName: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: "anonymus"
    },
    comment: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5
    }
  }, {
    sequelize,
    tableName: 'comments',
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
        name: "recipeId_fk_idx",
        using: "BTREE",
        fields: [
          { name: "recipeId" },
        ]
      },
    ]
  });
};
