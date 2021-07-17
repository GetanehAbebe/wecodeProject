const Sequelize = require('sequelize');
const sequelize = require('../utill/database')

const Unit = sequelize.define('measuringUnit', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,

    },
    unitInGram: {
        type: Sequelize.FLOAT,
    }

})
module.exports = Unit;