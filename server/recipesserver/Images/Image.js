const Sequelize = require('sequelize');
const sequelize = require('../utill/database')

const Image = sequelize.define('images', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    url: {
        type: Sequelize.STRING(255),
    },
    title: {
        type: Sequelize.STRING(50),
    },
    alt: {
        type: Sequelize.STRING(30),
    },
    figureCaption: {
        type: Sequelize.STRING(100),
    }

})
module.exports = Image;