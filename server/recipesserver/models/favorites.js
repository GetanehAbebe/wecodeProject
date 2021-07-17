const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favorites', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DietId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'favorites',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserId" },
          { name: "DietId" },
        ]
      },
    ]
  });
};
