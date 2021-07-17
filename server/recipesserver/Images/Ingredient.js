const Sequelize = require('sequelize');
const sequelize = require('../utill/database')

const Ingredient = sequelize.define('ingredients', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,

    },
    pricePerGram: {
        type: Sequelize.FLOAT,
    }

})
module.exports = Ingredient;