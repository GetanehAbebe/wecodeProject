const Sequelize = require('sequelize');
const sequelize = require('../utill/database')
const Recipe = require('../models/Recipe')
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

        },
    })

    return User;
};

// module.exports = User;