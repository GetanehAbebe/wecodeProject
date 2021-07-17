const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recipediets', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dietId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'recipediets',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "recipeId" },
          { name: "dietId" },
        ]
      },
    ]
  });
};
