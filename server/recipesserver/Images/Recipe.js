const Sequelize = require('sequelize');
const sequelize = require('../utill/database')

const Recipe = sequelize.define("recipes", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },
    views: {
        type: Sequelize.INTEGER,
    },
    uploadDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    source: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sourceUrl: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    isPrivate: {
        type: Sequelize.BOOLEAN,

    },
    prepTimeMin: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

}
)
module.exports = Recipe;