const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('images', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    alt: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    figureCaption: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'images',
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
        name: "images_fk_idx",
        using: "BTREE",
        fields: [
          { name: "recipeId" },
        ]
      },
    ]
  });
};
