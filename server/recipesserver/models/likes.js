const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('like', {

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });
};
