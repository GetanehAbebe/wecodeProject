const Sequelize = require('sequelize');
const sequelize = require('../utill/database')

const RecipeIngredient = sequelize.define('RecipeIngredients', {
    recipeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ingredientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },

})
module.exports = RecipeIngredient;