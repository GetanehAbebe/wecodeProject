const Sequelize = require('sequelize');
const sequelize = require('../utill/database')

const Category = sequelize.define('categories', {
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
module.exports = Category;