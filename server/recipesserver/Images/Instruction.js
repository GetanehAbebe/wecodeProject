const Sequelize = require('sequelize');
const sequelize = require('../utill/database')

const Instruction = sequelize.define('instructions', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    instruction: {
        type: Sequelize.STRING(50),
        allowNull: false,

    },
    recipeId: {
        type: Sequelize.INTEGER(50),
        allowNull: false,

    }

})
module.exports = Instruction;