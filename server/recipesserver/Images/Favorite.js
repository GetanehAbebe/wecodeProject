const Sequelize = require('sequelize');
const sequelize = require('../utill/database')
const Diet = require('./Diet')
const User = require('./User')
const Favorite = sequelize.define('favorites', {
    UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    DietId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    }

})
module.exports = Favorite