const Sequelize = require('sequelize');
const sequelize = require('../utill/database')

const Diet = sequelize.define('diets', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,

    }

})
module.exports = Diet;