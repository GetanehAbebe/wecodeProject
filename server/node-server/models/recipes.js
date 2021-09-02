const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recipes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "name_UNIQUE"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    uploadDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    source: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    sourceUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    prepTimeMin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'recipes',
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
        name: "name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "userId_fk_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
};
