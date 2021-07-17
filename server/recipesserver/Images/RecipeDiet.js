const Sequelize = require('sequelize');
const sequelize = require('../utill/database')
const RcipeDiet = sequelize.define('RecipeDiets', {
    recipeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    dietId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
})
module.exports = RcipeDiet;