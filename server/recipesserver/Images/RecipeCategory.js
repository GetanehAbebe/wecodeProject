const Sequelize = require('sequelize');
const sequelize = require('../utill/database')

const RecipeCategory = sequelize.define('RecipeCategories', {
    recipeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },

})
module.exports = RecipeCategory;